import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { Logger } from 'winston';
import { ProductRepository } from '../repository/product.repository';
import { createContextWinston } from '../../../utils/logger';
import {
  DescriptionProductDto,
  PricesProductDto,
  ProductCreateDto,
  ProductDto,
  ProductFilterDto,
} from '../dto/product.dto';
import { DescriptionProductRepository } from '../repository/description-product.repository';
import { PriceRepository } from '../repository/price-product.repository';
import {
  getProductParams,
  productFindDataResponse,
  productFindQueryOptions,
} from '../utils/product.util';
import { GeolocationData } from '../../geolocation/interfaces/geolocation.interface';
import { ImageProductRepository } from '../repository/image-product.repository';
import { S3Service } from '../../../s3/service/s3.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly _productRepository: ProductRepository,
    private readonly _descriptionProductRepository: DescriptionProductRepository,
    private readonly _priceRepository: PriceRepository,
    private readonly _imageProductRepository: ImageProductRepository,
    private readonly _mongoErrorHandler: MongoErrorHandler,
    private readonly _s3Service: S3Service,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(product: ProductCreateDto) {
    const context = createContextWinston(
      this.constructor.name,
      this.create.name,
    );
    try {
      this.logger.debug('Attempting  to create a product', {
        ...context,
      });
      const productCreated = await this._productRepository.create({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
      });

      await Promise.all([
        ...product.descriptionsProduct.map((description) =>
          this._createDescriptionProduct(productCreated._id, description),
        ),
        ...product.pricesProduct.map((price) =>
          this._createPricesProduct(productCreated._id, price),
        ),
      ]);

      return { _id: productCreated._id };
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(error, this.create.name);
    }
  }

  async update(product: ProductDto, productId: string) {
    const context = createContextWinston(
      this.constructor.name,
      this.update.name,
    );
    try {
      this.logger.debug('Attempting  to update a product', {
        ...context,
      });

      const productUpdated = await this._productRepository.findOneAndUpdate(
        { _id: productId },
        {
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: product.categoryId,
        },
      );

      return productUpdated;
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(error, this.update.name);
    }
  }

  async uploadImagesProducts(
    productId: string,
    files: Array<Express.Multer.File>,
  ) {
    const context = createContextWinston(
      this.constructor.name,
      this.uploadImagesProducts.name,
    );

    try {
      this.logger.debug('Attempting  to upload image', {
        ...context,
      });
      await Promise.all(
        files.map((image) => this._uploadImage(image, productId)),
      );
      return {
        message: 'Uploaded files successfully',
      };
    } catch (error) {
      this.logger.error('Error to upload images', {
        ...context,
        message: error.message,
      });

      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async _uploadImage(image: Express.Multer.File, productId: string) {
    if (image) {
      const createImage = await this._imageProductRepository.create({
        productId,
      });

      const fileUpload = await this._s3Service.uploadFile(
        image,
        `products/${productId}`,
        createImage._id,
      );
      const dataImage = {
        key: fileUpload.key,
        location: fileUpload.Location,
        mimeType: image.mimetype,
      };

      await this._imageProductRepository.findOneAndUpdate(
        {
          _id: createImage._id,
        },
        {
          image: dataImage,
        },
      );
    }
  }

  async getAll(filter: ProductFilterDto, geolocationData: GeolocationData) {
    const context = createContextWinston(
      this.constructor.name,
      this.getAll.name,
    );

    const productQueryParams = getProductParams(filter);
    const productQueryOption = productFindQueryOptions(filter);
    try {
      this.logger.debug('Attempting  to get user records', {
        ...context,
      });

      let products = await this._productRepository.find(
        productQueryParams,
        productQueryOption,
      );
      const count = await this._productRepository.count(productQueryParams);

      products = await Promise.all(
        products.map((product) => this._makeObjectProducts(product)),
      );
      return productFindDataResponse(filter, products, count, geolocationData);
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(error, this.getAll.name);
    }
  }

  _createDescriptionProduct(
    productId: string,
    descriptions: DescriptionProductDto,
  ) {
    return this._descriptionProductRepository.create({
      title: descriptions.title,
      value: descriptions.value,
      productId: productId,
    });
  }

  _createPricesProduct(productId: string, prices: PricesProductDto) {
    return this._priceRepository.create({
      price: prices.price,
      productId: productId,
    });
  }

  async _makeObjectProducts(product) {
    const prices = await this._priceRepository.find({
      productId: product._id,
      avaliable: true,
    });

    const descriptions = await this._descriptionProductRepository.find({
      productId: product._id,
    });

    let images = await this._imageProductRepository.find({
      productId: product._id,
    });

    images = await Promise.all(
      images.map((imageData) => this._getImagesUrl(imageData.image)),
    );
    return {
      ...product._doc,
      prices,
      descriptions,
      images,
    };
  }

  async _getImagesUrl(dataImage) {
    return await this._s3Service.getFileUrl(dataImage?.key);
  }
}
