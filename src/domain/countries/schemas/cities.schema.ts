import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type CitiesDocument = Cities & Document;

@Schema()
export class Cities extends Document {
  @Prop()
  code: string;

  @Prop()
  name: string;
}

export const CitiesSchema = SchemaFactory.createForClass(Cities);
