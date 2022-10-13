import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { META_ROLES } from '../decorators';
import { User } from '../../users/entities';
import { ValidRoles } from '../interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get( META_ROLES, context.getHandler() );

    if ( !validRoles || validRoles.length === 0 ) 
      return true;

    const req = context.switchToHttp().getRequest();
    const user: User | undefined = req.user;

    if ( !user )
      throw new BadRequestException('User not found on request');

    for (const role of validRoles) {
      if (role === ValidRoles.Psychologist && user.psychologist)
        return true;
      
      if (role === ValidRoles.Patient && user.patient)
        return true;
    }

    throw new ForbiddenException(`User need a valid role: ${ validRoles }`);
  }
}
