import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Users } from '../../user/schema/users.schema';
import { Products } from './products.schema';
import * as dayjs from 'dayjs';

export type ReviewsProductsDocument = ReviewsProducts & Document;

@Schema()
export class ReviewsProducts extends Document {
  @Prop()
  review: string;

  @Prop()
  points: number;

  @Prop({ default: dayjs() })
  date: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Products.name,
    index: true,
  })
  productId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Users.name,
    index: true,
  })
  userId: string;
}

export const ReviewsProductsSchema =
  SchemaFactory.createForClass(ReviewsProducts);
