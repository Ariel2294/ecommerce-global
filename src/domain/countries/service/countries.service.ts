import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { createContextWinston } from '../../../utils/logger';
import { Logger } from 'winston';
import { CountryFilterDto } from '../dto/country.dto';
import { CountryRepository } from '../repository/country.repository';
import {
  countryFindDataResponse,
  countryFindQueryOptions,
  getCountryParams,
} from '../utils/country.util';

@Injectable()
export class CountriesService {
  constructor(
    private readonly _countryRepository: CountryRepository,
    private readonly _mongoErrorHandler: MongoErrorHandler,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getAll(filter: CountryFilterDto) {
    const context = createContextWinston(
      this.constructor.name,
      this.getAll.name,
    );
    const countryQueryParams = getCountryParams(filter);
    const countryQueryOption = countryFindQueryOptions(filter);
    try {
      this.logger.debug('Attempting  to get countries records', {
        ...context,
      });

      const countries = await this._countryRepository.find(
        countryQueryParams,
        countryQueryOption,
      );

      const count = await this._countryRepository.count(countryQueryParams);

      return countryFindDataResponse(filter, countries, count);
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(error, this.getAll.name);
    }
  }
}
