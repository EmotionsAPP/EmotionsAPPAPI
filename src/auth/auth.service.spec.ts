import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { User } from '../users/entities';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn()
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn()
          }
        },
        {
          provide: getModelToken( User.name ),
          useValue: {
            findById: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>( AuthService );
    model = module.get<Model<User>>( getModelToken( User.name ) );
    jwtService = module.get<JwtService>( JwtService );
    userService = module.get<UsersService>( UsersService );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
