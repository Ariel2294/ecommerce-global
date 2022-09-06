import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { Users } from './users.schema';
import { v4 as uuidv4 } from 'uuid';

export type UsersVerificationsDocument = UsersVerifications & Document;

@Schema()
export class UsersVerifications {
  @Prop({ default: uuidv4() })
  token: string;

  @Prop()
  verfication_date: Date;

  @Prop({ default: true })
  is_valid: boolean;

  @Prop()
  token_expiration_date: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Users.name,
    index: true,
  })
  user: string;
}

export const UsersVerificationsSchema =
  SchemaFactory.createForClass(UsersVerifications);
