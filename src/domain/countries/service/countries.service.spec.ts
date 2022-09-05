import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import {
  countriesDataMock,
  countriesResultMock,
} from '../../../__mocks__/countries.mock';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { MockModel } from '../../../__mocks__/database.mock';
import { CountryRepository } from '../repository/country.repository';
import { Countries } from '../schemas/countries.schema';
import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  let service: CountriesService;
  let countryRepository: CountryRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({ silent: true })],
      providers: [
        CountriesService,
        CountryRepository,
        MongoErrorHandler,
        {
          provide: getModelToken(Countries.name),
          useValue: MockModel,
        },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    countryRepository = module.get<CountryRepository>(CountryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get countries', () => {
    it('should get data countries', async () => {
      countryRepository.find = jest.fn().mockReturnValueOnce(countriesDataMock);
      countryRepository.count = jest.fn().mockReturnValueOnce(1);
      const result = await service.getAll({});
      expect(result).toMatchObject(countriesResultMock);
    });
  });
});
