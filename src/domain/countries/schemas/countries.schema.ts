import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type CountriesDocument = Countries & Document;

@Schema()
export class Countries extends Document {
  @Prop()
  code: string;

  @Prop()
  name: string;
}

export const CountriesSchema = SchemaFactory.createForClass(Countries);
