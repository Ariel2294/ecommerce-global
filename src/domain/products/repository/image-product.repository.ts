import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../database/entity.repository';

import {
  ImagesProducts,
  ImagesProductsDocument,
} from '../schemas/images-products.schema';

@Injectable()
export class ImageProductRepository extends EntityRepository<ImagesProductsDocument> {
  constructor(
    @InjectModel(ImagesProducts.name)
    imageProductModel: Model<ImagesProductsDocument>,
  ) {
    super(imageProductModel);
  }
}
