import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { S3Service } from '../../../s3/service/s3.service';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { MockModel } from '../../../__mocks__/database.mock';
import { DescriptionProductRepository } from '../repository/description-product.repository';
import { ImageProductRepository } from '../repository/image-product.repository';
import { PriceRepository } from '../repository/price-product.repository';
import { ProductRepository } from '../repository/product.repository';
import { Categories } from '../schemas/categories.schema';
import { DescriptionsProducts } from '../schemas/descriptions-products.schema';
import { ImagesProducts } from '../schemas/images-products.schema';
import { PricesProducts } from '../schemas/prices-products.schema';
import { Products } from '../schemas/products.schema';
import { ReviewsProducts } from '../schemas/reviews-products.schema';
import { ProductsService } from './products.service';
import { EcommerceGlobalConfig } from '../../../config/ecommerce-global.config';
import { EcommerceGlobalModule } from '../../../config/ecommerce-global.module';
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from '../../../__mocks__/ecommerce-global.mock';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({ silent: true }), EcommerceGlobalModule],
      providers: [
        ProductsService,
        ProductRepository,
        DescriptionProductRepository,
        PriceRepository,
        ImageProductRepository,
        MongoErrorHandler,
        S3Service,
        EcommerceGlobalConfig,
        {
          provide: getModelToken(Categories.name),
          useValue: MockModel,
        },
        {
          provide: getModelToken(Products.name),
          useValue: MockModel,
        },
        {
          provide: getModelToken(DescriptionsProducts.name),
          useValue: MockModel,
        },
        {
          provide: getModelToken(ImagesProducts.name),
          useValue: MockModel,
        },
        {
          provide: getModelToken(PricesProducts.name),
          useValue: MockModel,
        },
        {
          provide: getModelToken(ReviewsProducts.name),
          useValue: MockModel,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
