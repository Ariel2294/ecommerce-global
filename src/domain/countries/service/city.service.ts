import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { createContextWinston } from '../../../utils/logger';
import { Logger } from 'winston';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { CityFilterDto } from '../dto/city.dto';
import { CityRepository } from '../repository/city.repository';
import {
  cityFindDataResponse,
  cityFindQueryOptions,
  getCityParams,
} from '../utils/city.util';

@Injectable()
export class CityService {
  constructor(
    private readonly _cityRepository: CityRepository,
    private readonly _mongoErrorHandler: MongoErrorHandler,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getAll(filter: CityFilterDto) {
    const context = createContextWinston(
      this.constructor.name,
      this.getAll.name,
    );
    const cityQueryParams = getCityParams(filter);
    const cityQueryOption = cityFindQueryOptions(filter);
    try {
      this.logger.debug('Attempting  to get countries records', {
        ...context,
      });

      const cities = await this._cityRepository.find(
        cityQueryParams,
        cityQueryOption,
      );

      const count = await this._cityRepository.count(cityQueryParams);

      return cityFindDataResponse(filter, cities, count);
    } catch (error) {
      this._mongoErrorHandler.handleMongooseErrors(error, this.getAll.name);
    }
  }
}
