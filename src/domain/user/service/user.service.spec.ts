import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from '../schema/users.schema';
import { UserModel } from '../test/user.model.mock';
import { dataUserMock } from '../../../__mocks__/users.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  //let userModel: UserModel;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({ silent: true })],
      providers: [
        UserService,
        UserRepository,
        MongoErrorHandler,
        {
          provide: getModelToken(Users.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(Users.name),
            useValue: UserModel,
          },
        ],
      }).compile();

      userRepository = moduleRef.get<UserRepository>(UserRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let user: Users;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, 'save');
          constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
          user = await userRepository.create(dataUserMock());
        });

        test('then it should call the userModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(dataUserMock());
        });

        test('then it should return a user', () => {
          expect(user).toEqual(dataUserMock());
        });
      });
    });
  });
});
