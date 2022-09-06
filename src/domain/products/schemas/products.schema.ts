import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Categories } from './categories.schema';

export type ProductsDocument = Products & Document;

@Schema()
export class Products extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Categories.name,
    index: true,
  })
  categoryId: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
