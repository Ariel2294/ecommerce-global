import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../database/entity.repository';
import {
  PricesProducts,
  PricesProductsDocument,
} from '../schemas/prices-products.schema';

@Injectable()
export class PriceRepository extends EntityRepository<PricesProductsDocument> {
  constructor(
    @InjectModel(PricesProducts.name)
    priceProductModel: Model<PricesProductsDocument>,
  ) {
    super(priceProductModel);
  }
}
