import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { MockModel } from '../../../__mocks__/database.mock';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { CategoryRepository } from '../repository/category.repository';
import { Categories } from '../schemas/categories.schema';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({ silent: true })],
      providers: [
        CategoryService,
        CategoryRepository,
        MongoErrorHandler,
        {
          provide: getModelToken(Categories.name),
          useValue: MockModel,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
