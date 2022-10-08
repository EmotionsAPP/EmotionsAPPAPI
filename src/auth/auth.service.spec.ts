import { UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { hashPassword, verifyPassword } from './security/bcrypt.security';

import { usersArray } from '../../test/data';

import { User } from '../users/entities';
import { LoginUserDto } from './dto';
import { ValidRoles } from './interfaces';
import { CreateUserDto } from '../users/dto';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

const user: any = usersArray[0];
user.email = "test";
user.password = "Af91249fa";
user.toObject = jest.fn(() => ( user ));
user.populate = jest.fn(() => ( user ));

const createUser: CreateUserDto = {
  email: user.email,
  password: user.password,
  firstName: user.firstName,
  lastName: user.lastName
};

const loginUser: LoginUserDto = {
  email: user.email,
  password: user.password
};

jest.mock('./security/bcrypt.security', () => {
  const originalModule = jest.requireActual('./security/bcrypt.security');

  return {
    __esModule: true,
    ...originalModule,
    hashPassword: jest.fn(() => user.password),
    verifyPassword: jest.fn()
      .mockReturnValueOnce( true )
      .mockReturnValueOnce( true )
      .mockReturnValueOnce( false )
  }
});

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
            sign: jest.fn().mockReturnValue( token )
          }
        },
        {
          provide: getModelToken( User.name ),
          useValue: {
            findById: jest.fn(),
            findOne: jest.fn()
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

  describe('register', () => {
    it('should return user and token', async () => {
      jest.spyOn(userService, "create").mockReturnValueOnce( user );

      expect(await service.register( createUser )).toEqual({ user, token });
    });
  });

  describe('login', () => {
    it('should return user and token if users role is psychologist', async () => {
      jest.spyOn(model, "findOne").mockReturnValueOnce( user );

      expect(await service.login( loginUser )).toEqual({ user, token });
    });

    it('should return user and token if users role is patient', async () => {
      const patient: any = { 
        ...usersArray[2], 
        email: user.email, 
        password: user.password,
        toObject: jest.fn(() => ( patient )),
        populate: jest.fn(() => ( patient ))
      };
      jest.spyOn(model, "findOne").mockReturnValueOnce( patient );

      const { email, password } = patient;
      expect(await service.login( { email, password } )).toEqual({ user: patient, token });
    });

    it('should throw unauthorized exception if user is not found', async () => {
      jest.spyOn(model, "findOne").mockReturnValueOnce( undefined );

      try {
        await service.login( loginUser );
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should throw unauthorized exception if user password does not match', async () => {
      jest.spyOn(model, "findOne").mockReturnValueOnce( user );

      try {
        await service.login( loginUser );
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe('checkAuthStatus', () => {
    it('should return user and token', async () => {
      expect(await service.checkAuthStatus( user )).toEqual({ user, token });
    });
  });
});
