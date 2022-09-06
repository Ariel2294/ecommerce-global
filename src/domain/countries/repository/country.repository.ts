import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../database/entity.repository';
import { CountriesDocument, Countries } from '../schemas/countries.schema';

@Injectable()
export class CountryRepository extends EntityRepository<CountriesDocument> {
  constructor(
    @InjectModel(Countries.name) countryModel: Model<CountriesDocument>,
  ) {
    super(countryModel);
  }
}
