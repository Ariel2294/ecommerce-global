import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../database/entity.repository';
import {
  UsersVerifications,
  UsersVerificationsDocument,
} from '../schema/users-verification.schema';

@Injectable()
export class UserVerificationsRepository extends EntityRepository<UsersVerificationsDocument> {
  constructor(
    @InjectModel(UsersVerifications.name)
    userVerificationModel: Model<UsersVerificationsDocument>,
  ) {
    super(userVerificationModel);
  }
}
