import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from '../schema/users.schema';
import { dataUserMock, userDtoMock } from '../../../__mocks__/users.mock';
import { UserVerificationsRepository } from '../repository/user-verification.repository';
import { UsersVerifications } from '../schema/users-verification.schema';
import { MockModel } from '../../../__mocks__/database.mock';
import { InternalServerErrorException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let userVerificationsRepository: UserVerificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({ silent: true })],
      providers: [
        UserService,
        UserRepository,
        UserVerificationsRepository,
        MongoErrorHandler,
        {
          provide: getModelToken(Users.name),
          useValue: MockModel,
        },
        {
          provide: getModelToken(UsersVerifications.name),
          useValue: MockModel,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userVerificationsRepository = module.get<UserVerificationsRepository>(
      UserVerificationsRepository,
    );
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create operations', () => {
    describe('create', () => {
      it('should create new user', async () => {
        userRepository.create = jest.fn().mockReturnValueOnce(dataUserMock);
        userVerificationsRepository.create = jest
          .fn()
          .mockResolvedValueOnce({ user: '63122c5a82bf6850c2bd00cf' });

        const result = await service.create(userDtoMock);

        expect(result).toMatchObject({
          _id: '63122c5a82bf6850c2bd00cf',
        });
      });

      it('should  fail to create new user', async () => {
        userRepository.create = jest
          .fn()

          .mockImplementationOnce(() => {
            throw new InternalServerErrorException();
          });
        userVerificationsRepository.create = jest
          .fn()
          .mockImplementationOnce(() => {
            throw new InternalServerErrorException();
          });

        try {
          await service.create(userDtoMock);
        } catch (error) {
          expect(error).toBeInstanceOf(InternalServerErrorException);
          expect(error.status).toBe(500);
          expect(error.message).toBe('Internal Server Error');
        }
      });
    });
  });
});
