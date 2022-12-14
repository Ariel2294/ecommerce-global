import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { Countries } from '../../countries/schemas/countries.schema';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  timezone: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  preferred_currency: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  newsletter: boolean;

  @Prop({ default: false })
  verifyAccount: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Countries.name,
    index: true,
  })
  country;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
