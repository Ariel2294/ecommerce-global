import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../database/entity.repository';
import { Cities, CitiesDocument } from '../schemas/cities.schema';

@Injectable()
export class CityRepository extends EntityRepository<CitiesDocument> {
  constructor(@InjectModel(Cities.name) cityModel: Model<CitiesDocument>) {
    super(cityModel);
  }
}
