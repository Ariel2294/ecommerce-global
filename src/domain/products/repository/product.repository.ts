import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../database/entity.repository';
import { Products, ProductsDocument } from '../schemas/products.schema';

@Injectable()
export class ProductRepository extends EntityRepository<ProductsDocument> {
  constructor(
    @InjectModel(Products.name) productModel: Model<ProductsDocument>,
  ) {
    super(productModel);
  }
}
