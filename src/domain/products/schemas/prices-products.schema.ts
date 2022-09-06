import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Products } from './products.schema';

export type PricesProductsDocument = PricesProducts & Document;

@Schema()
export class PricesProducts extends Document {
  @Prop()
  price: number;

  @Prop({ default: true })
  avaliable: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Products.name,
    index: true,
  })
  productId: string;
}

export const PricesProductsSchema =
  SchemaFactory.createForClass(PricesProducts);
