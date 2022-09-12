import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UsersService } from '../users/users.service';
import { hashPassword, verifyPassword } from './security';

import { User } from '../users/entities';
import { JwtPayload, ValidRoles } from './interfaces';
import { LoginUserDto } from './dto';
import { CreateUserDto } from '../users/dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel( User.name )
    private readonly userModel: Model<User>,

    private readonly usersService: UsersService,

    private readonly jwtService: JwtService
  ) {}

  async register( createUserDto: CreateUserDto ) {
    
    createUserDto.password = await hashPassword( createUserDto.password );

    const user = await this.usersService.create( createUserDto );

    delete user.password;

    return {
      user: { ...user.toObject() },
      token: this.getJwtToken({ id: user.id })
    }
  }

  async login( loginUserDto: LoginUserDto, validRole: ValidRoles ) {

    const { email, password } = loginUserDto;

    let user: User;

    if (validRole === ValidRoles.Psychologist) {
      user = await this.userModel.findOne({
        email, isActive: true, psychologist: { $ne: null }
      });
    } else {
      user = await this.userModel.findOne({
        email, isActive: true, patient: { $ne: null }
      });
    }

    if ( !user )
      throw new UnauthorizedException("Email is not valid");
    
    if ( !(await verifyPassword( password, user.password )) )
      throw new UnauthorizedException("Password is not valid");

    delete user.password;

    return {
      user: { ...user.toObject() },
      token: this.getJwtToken({ id: user.id })
    }
  }

  async checkAuthStatus( user: User ) {

    return {
      user: { ...user },
      token: this.getJwtToken({ id: user.id })
    }
  }

  private getJwtToken( payload: JwtPayload ) {

    return this.jwtService.sign( payload );
  }
}
