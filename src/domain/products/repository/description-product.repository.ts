import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../database/entity.repository';
import {
  DescriptionsProducts,
  DescriptionsProductsDocument,
} from '../schemas/descriptions-products.schema';

@Injectable()
export class DescriptionProductRepository extends EntityRepository<DescriptionsProductsDocument> {
  constructor(
    @InjectModel(DescriptionsProducts.name)
    descriptionProductModel: Model<DescriptionsProductsDocument>,
  ) {
    super(descriptionProductModel);
  }
}
