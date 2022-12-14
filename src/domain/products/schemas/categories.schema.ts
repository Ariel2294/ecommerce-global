import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type CategoriesDocument = Categories & Document;

@Schema()
export class Categories extends Document {
  @Prop()
  name: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
