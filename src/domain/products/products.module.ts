import { Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { CategoryService } from './service/category.service';
import { ProductsController } from './controller/products.controller';
import { CategoriesController } from './controller/categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesSchema } from './schemas/categories.schema';
import { Products, ProductsSchema } from './schemas/products.schema';
import { CategoryRepository } from './repository/category.repository';
import { MongoErrorHandler } from '../../database/handlers/mongo-error-handler';
import {
  DescriptionsProducts,
  DescriptionsProductsSchema,
} from './schemas/descriptions-products.schema';
import {
  ImagesProducts,
  ImagesProductsSchema,
} from './schemas/images-products.schema';
import {
  PricesProducts,
  PricesProductsSchema,
} from './schemas/prices-products.schema';
import {
  ReviewsProducts,
  ReviewsProductsSchema,
} from './schemas/reviews-products.schema';
import { ProductRepository } from './repository/product.repository';
import { DescriptionProductRepository } from './repository/description-product.repository';
import { PriceRepository } from './repository/price-product.repository';
import { ImageProductRepository } from './repository/image-product.repository';
import { S3Service } from '../../s3/service/s3.service';
import { EcommerceGlobalConfig } from '../../config/ecommerce-global.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
      { name: Products.name, schema: ProductsSchema },
      { name: DescriptionsProducts.name, schema: DescriptionsProductsSchema },
      { name: ImagesProducts.name, schema: ImagesProductsSchema },
      { name: PricesProducts.name, schema: PricesProductsSchema },
      { name: ReviewsProducts.name, schema: ReviewsProductsSchema },
    ]),
  ],
  providers: [
    ProductsService,
    CategoryService,
    CategoryRepository,
    MongoErrorHandler,
    ProductRepository,
    DescriptionProductRepository,
    PriceRepository,
    ImageProductRepository,
    S3Service,
    EcommerceGlobalConfig,
  ],
  controllers: [ProductsController, CategoriesController],
})
export class ProductsModule {}
