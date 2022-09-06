import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../database/entity.repository';
import {
  ReviewsProducts,
  ReviewsProductsDocument,
} from '../schemas/reviews-products.schema';

@Injectable()
export class ReviewRepository extends EntityRepository<ReviewsProductsDocument> {
  constructor(
    @InjectModel(ReviewsProducts.name)
    reviewProductModel: Model<ReviewsProductsDocument>,
  ) {
    super(reviewProductModel);
  }
}
