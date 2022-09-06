import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MockModel } from '../../../__mocks__/database.mock';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { CityRepository } from '../repository/city.repository';
import { Cities } from '../schemas/cities.schema';
import { CityService } from './city.service';
import {
  citiesDataMock,
  citiesResultMock,
} from '../../../__mocks__/cities.mock';
import { WinstonModule } from 'nest-winston';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: CityRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({ silent: true })],
      providers: [
        CityService,
        CityRepository,
        MongoErrorHandler,
        {
          provide: getModelToken(Cities.name),
          useValue: MockModel,
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<CityRepository>(CityRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get cities', () => {
    it('should get data cities', async () => {
      cityRepository.find = jest.fn().mockReturnValueOnce(citiesDataMock);
      cityRepository.count = jest.fn().mockReturnValueOnce(1);
      const result = await service.getAll({});
      expect(result).toMatchObject(citiesResultMock);
    });
  });
});
