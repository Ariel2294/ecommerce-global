import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../database/entity.repository';
import { Users, UsersDocument } from '../schema/users.schema';

@Injectable()
export class UserRepository extends EntityRepository<UsersDocument> {
  constructor(@InjectModel(Users.name) userModel: Model<UsersDocument>) {
    super(userModel);
  }
}
