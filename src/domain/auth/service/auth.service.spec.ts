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
} from '../../../__mocks__/auth.mock';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;
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
      const result = await service.login(mockUserCredentials);

      expect(result).toMatchObject(mockUserAuthResponse);
    });
  });
});
