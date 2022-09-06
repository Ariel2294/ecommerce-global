import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Products } from './products.schema';

export type ImagesProductsDocument = ImagesProducts & Document;

@Schema()
export class ImagesProducts extends Document {
  @Prop({ type: Object })
  image: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Products.name,
    index: true,
  })
  productId: string;
}

export const ImagesProductsSchema =
  SchemaFactory.createForClass(ImagesProducts);
