import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { Users, UsersSchema } from './schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repository/user.repository';
import { MongoErrorHandler } from '../../database/handlers/mongo-error-handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers: [UserService, UserRepository, MongoErrorHandler],
  controllers: [UserController],
})
export class UserModule {}
