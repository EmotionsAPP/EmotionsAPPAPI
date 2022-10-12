import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { usersArray } from '../../test/data';

import { LoginUserDto } from './dto';
import { ValidRoles } from './interfaces';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

const psychologist: any = usersArray[0];
psychologist.email = "test";
psychologist.password = "Af91249fa";

const patient: any = usersArray[2];
psychologist.email = "test";
psychologist.password = "Af91249fa";

const loginUser: LoginUserDto = {
  email: psychologist.email,
  password: psychologist.password
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            registerPsychologist: jest.fn(),
            login: jest.fn(),
            checkAuthStatus: jest.fn().mockReturnValue({ user: psychologist, token })
          }
        }
      ],
    }).compile();

    controller = module.get<AuthController>( AuthController );
    service = module.get<AuthService>( AuthService );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPsychologist', () => {
    it('should return user and token', async () => {
      jest.spyOn(service, "registerPsychologist").mockReturnValueOnce({ user: psychologist, token } as any);

      expect(await controller.createPsychologist( psychologist )).toEqual({ user: psychologist, token });
    });
  });

  describe('createPatient', () => {
    it('should return user and token', async () => {
      jest.spyOn(service, "register").mockReturnValueOnce({ user: patient, token } as any);

      expect(await controller.createPatient( patient )).toEqual({ user: patient, token });
    });
  });

  describe('loginPsychologist', () => {
    it('should return user and token if users role is psychologist', async () => {
      jest.spyOn(service, "login").mockReturnValueOnce({ user: psychologist, token } as any);

      expect(await controller.login( loginUser )).toEqual({ user: psychologist, token });
    });
  });

  describe('loginPatient', () => {
    it('should return user and token if users role is patient', async () => {
      jest.spyOn(service, "login").mockReturnValueOnce({ user: patient, token } as any);

      expect(await controller.login( loginUser )).toEqual({ user: patient, token });
    });
  });

  describe('checkAuthStatus', () => {
    it('should return user and token', async () => {
      expect(await controller.checkAuthStatus( psychologist )).toEqual({ user: psychologist, token });
    });
  });
});
