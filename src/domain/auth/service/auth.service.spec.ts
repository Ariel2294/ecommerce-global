import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { Users } from '../../user/schema/users.schema';
import { MongoErrorHandler } from '../../../database/handlers/mongo-error-handler';
import { UserVerificationsRepository } from '../../user/repository/user-verification.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { EncrytionAuth } from '../utils/encryption-auth.util';
import { AuthService } from './auth.service';
import { MockModel } from '../../../__mocks__/database.mock';
import { UsersVerifications } from '../../user/schema/users-verification.schema';
import { ConfigModule } from '@nestjs/config';
import { mockEnv } from '../../../__mocks__/ecommerce-global.mock';
import { EcommerceGlobalConfig } from '../../../config/ecommerce-global.config';
import {
  mockUserAuth,
  mockUserAuthResponse,
  mockUserCredentials,
  mockVerficationUDataUserFindAndUpdate,
  mockVerificationDataFindOne,
  mockVerificationDataFindOneAndUpdate,
} from '../../../__mocks__/auth.mock';
import { dataUserMock, userDtoMock } from '../../../__mocks__/users.mock';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as utils from '../utils/auth.utils';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;
  let userVerificationsRepository: UserVerificationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserRepository,
        UserVerificationsRepository,
        EncrytionAuth,
        MongoErrorHandler,
        EcommerceGlobalConfig,

        {
          provide: JwtService,
          useValue: {
            registerAsync: jest.fn(),
          },
        },
        {
          provide: getModelToken(Users.name),
          useValue: MockModel,
        },
        {
          provide: getModelToken(UsersVerifications.name),
          useValue: MockModel,
        },
      ],
      imports: [
        WinstonModule.forRoot({ silent: true }),
        ConfigModule.forRoot({
          load: [() => mockEnv],
          ignoreEnvFile: false,
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    userVerificationsRepository = module.get<UserVerificationsRepository>(
      UserVerificationsRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create login users', () => {
    it('login should success', async () => {
      userRepository.findOne = jest.fn().mockReturnValueOnce(mockUserAuth);
      service._loginJwtReponse = jest
        .fn()
        .mockReturnValueOnce(mockUserAuthResponse);
      const result = await service.login(mockUserCredentials, '127.0.0.1');

      expect(result).toMatchObject(mockUserAuthResponse);
    });
  });

  describe('create public users register', () => {
    it('should create new user', async () => {
      userRepository.create = jest.fn().mockReturnValueOnce(dataUserMock);
      userVerificationsRepository.create = jest
        .fn()
        .mockResolvedValueOnce({ user: '63122c5a82bf6850c2bd00cf' });

      const result = await userRepository.create(userDtoMock);

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
        await userRepository.create(userDtoMock);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(500);
        expect(error.message).toBe('Internal Server Error');
      }
    });
  });

  describe('verify account users', () => {
    it('should  verify successfully', async () => {
      userVerificationsRepository.findOne = jest
        .fn()
        .mockReturnValueOnce(mockVerificationDataFindOne);

      userVerificationsRepository.findOneAndUpdate = jest
        .fn()
        .mockReturnValueOnce(mockVerificationDataFindOneAndUpdate);

      userRepository.findOneAndUpdate = jest
        .fn()
        .mockReturnValueOnce(mockVerficationUDataUserFindAndUpdate);

      const result = await service.verifyAccount(
        '0093bde2-a46f-408d-af90-2a290ad939e1',
      );

      expect(result).toMatchObject({
        message: 'Account validated successfully',
      });
    });

    it('should fail due to expired token', async () => {
      jest
        .spyOn(utils, 'validationExpireTokenVerify')
        .mockReturnValueOnce(true);
      userVerificationsRepository.findOne = jest
        .fn()
        .mockReturnValueOnce(mockVerificationDataFindOne);

      userVerificationsRepository.findOneAndUpdate = jest
        .fn()
        .mockReturnValueOnce(mockVerificationDataFindOneAndUpdate);

      userRepository.findOneAndUpdate = jest
        .fn()
        .mockReturnValueOnce(mockVerficationUDataUserFindAndUpdate);

      try {
        await service.verifyAccount('0093bde2-a46f-408d-af90-2a290ad939e1');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('token has expired');
      }
    });

    it('should fail because the token was already used', async () => {
      mockVerificationDataFindOne.is_valid = false;
      userVerificationsRepository.findOne = jest
        .fn()
        .mockReturnValueOnce(mockVerificationDataFindOne);

      userVerificationsRepository.findOneAndUpdate = jest
        .fn()
        .mockReturnValueOnce(mockVerificationDataFindOneAndUpdate);

      userRepository.findOneAndUpdate = jest
        .fn()
        .mockReturnValueOnce(mockVerficationUDataUserFindAndUpdate);

      try {
        await service.verifyAccount('0093bde2-a46f-408d-af90-2a290ad939e1');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('token was already used');
      }
    });
  });
});
