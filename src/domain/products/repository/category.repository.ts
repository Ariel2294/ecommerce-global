import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../database/entity.repository';
import { Categories, CategoriesDocument } from '../schemas/categories.schema';

@Injectable()
export class CategoryRepository extends EntityRepository<CategoriesDocument> {
  constructor(
    @InjectModel(Categories.name) categoryModel: Model<CategoriesDocument>,
  ) {
    super(categoryModel);
  }
}
