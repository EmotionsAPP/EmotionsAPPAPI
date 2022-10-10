import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UsersService } from '../users/users.service';
import { hashPassword, verifyPassword } from './security';

import { User } from '../users/entities';
import { JwtPayload, ValidRoles } from './interfaces';
import { LoginUserDto } from './dto';
import { CreatePsychologistUserDto, CreateUserDto } from '../users/dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel( User.name )
    private readonly userModel: Model<User>,

    private readonly usersService: UsersService,

    private readonly jwtService: JwtService
  ) {}

  async validatePsychologist( createPsychologist: CreatePsychologistUserDto ) {
    const notExists: boolean = await this.usersService.validatePsychologist( createPsychologist );

    if (!notExists) {
      throw new ConflictException("Cedula already exists");
    }
  }

  async register( createUserDto: CreateUserDto ) {
    
    createUserDto.password = await hashPassword( createUserDto.password );

    const user = await this.usersService.create( createUserDto );

    return this.checkAuthStatus( await this.populateUser( user ) );
  }

  async login( loginUserDto: LoginUserDto ) {

    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({
      email, isActive: true
    });

    if ( !user )
      throw new UnauthorizedException("Email is not valid");
    
    if ( !(await verifyPassword( password, user.password )) )
      throw new UnauthorizedException("Password is not valid");

    return this.checkAuthStatus( await this.populateUser( user ) );
  }

  async checkAuthStatus( user: User ) {

    return {
      user: { ...user.toObject() },
      token: this.getJwtToken({ id: user.id })
    }
  }

  private async populateUser( user: User ) {
    if ( user.psychologist )
      return await user.populate('psychologist');
    else
      return await user.populate('patient');
  }

  private getJwtToken( payload: JwtPayload ) {

    return this.jwtService.sign( payload );
  }
}
