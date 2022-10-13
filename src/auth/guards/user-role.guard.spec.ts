import { Reflector } from '@nestjs/core';
import { BadRequestException, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMock } from '@golevelup/ts-jest';

import { ValidRoles } from '../interfaces';
import { UserRoleGuard } from './user-role.guard';
import { usersArray } from '../../../test/data';

const emptyValidRoles: ValidRoles[] = [];
const validRoles: ValidRoles[] = [ValidRoles.Psychologist, ValidRoles.Patient];

const user = usersArray[0];

describe('UserRoleGuard', () => {
  let guard: UserRoleGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRoleGuard,
        {
          provide: Reflector,
          useValue: {
            get: jest.fn()
          }
        }
      ],
    }).compile();

    guard = module.get<UserRoleGuard>( UserRoleGuard );
    reflector = module.get<Reflector>( Reflector );
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if validRoles is empty', () => {
    jest.spyOn(reflector, "get").mockReturnValueOnce( emptyValidRoles );

    const context = createMock<ExecutionContext>();

    expect(guard.canActivate( context )).toBeTruthy();
  });

  it('should return true if META_ROLES is undefined', () => {
    jest.spyOn(reflector, "get").mockReturnValueOnce( undefined );

    const context = createMock<ExecutionContext>();

    expect(guard.canActivate( context )).toBeTruthy();
  });

  it('should throw bad request exception if user is not found on request', () => {
    jest.spyOn(reflector, "get").mockReturnValueOnce( validRoles );

    const context = createMock<ExecutionContext>();
    context.switchToHttp().getRequest.mockReturnValue({ user: undefined });

    try {
      guard.canActivate( context );
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('should return true if user is psychologist and META_ROLES contains that', () => {
    jest.spyOn(reflector, "get").mockReturnValueOnce( validRoles );

    const context = createMock<ExecutionContext>();
    context.switchToHttp().getRequest.mockReturnValue({ user });

    expect(guard.canActivate( context )).toBeTruthy();
  });

  it('should return true if user is psychologist and META_ROLES contains that', () => {
    jest.spyOn(reflector, "get").mockReturnValueOnce( validRoles );

    const context = createMock<ExecutionContext>();
    context.switchToHttp().getRequest.mockReturnValue({ user: usersArray[2] });

    expect(guard.canActivate( context )).toBeTruthy();
  });

  it('should throw forbidden exception if user roles is not on META_ROLES', () => {
    jest.spyOn(reflector, "get").mockReturnValueOnce( [validRoles.pop()] );

    const context = createMock<ExecutionContext>();
    context.switchToHttp().getRequest.mockReturnValue({ user });

    try {
      guard.canActivate( context );
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });
});
