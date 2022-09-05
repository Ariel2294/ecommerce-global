import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Products } from './products.schema';

export type DescriptionsProductsDocument = DescriptionsProducts & Document;

@Schema()
export class DescriptionsProducts extends Document {
  @Prop()
  title: string;

  @Prop()
  value: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Products.name,
    index: true,
  })
  productId: string;
}

export const DescriptionsProductsSchema =
  SchemaFactory.createForClass(DescriptionsProducts);
