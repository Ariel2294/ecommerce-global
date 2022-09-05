import { Module } from '@nestjs/common';
import { CountriesService } from './service/countries.service';
import { CountriesController } from './controller/countries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Countries, CountriesSchema } from './schemas/countries.schema';
import { CountryRepository } from './repository/country.repository';
import { MongoErrorHandler } from '../../database/handlers/mongo-error-handler';
import { CityService } from './service/city.service';
import { CitiesController } from './controller/cities.controller';
import { Cities, CitiesSchema } from './schemas/cities.schema';
import { CityRepository } from './repository/city.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Countries.name, schema: CountriesSchema },
      { name: Cities.name, schema: CitiesSchema },
    ]),
  ],
  providers: [
    CountriesService,
    CountryRepository,
    CityRepository,
    MongoErrorHandler,
    CityService,
  ],
  controllers: [CountriesController, CitiesController],
})
export class CountriesModule {}
