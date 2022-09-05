import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
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

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({ silent: true })],
      providers: [
        ProductsService,
        ProductRepository,
        DescriptionProductRepository,
        PriceRepository,
        ImageProductRepository,
        MongoErrorHandler,
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
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
