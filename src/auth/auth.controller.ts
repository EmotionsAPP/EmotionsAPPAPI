import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';

import { CreatePatientUserDto, CreatePsychologistUserDto } from '../users/dto';
import { LoginUserDto } from './dto';
import { ValidRoles } from './interfaces';
import { User } from '../users/entities';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Post('patients')
  createPatient(@Body() createPatientUserDto: CreatePatientUserDto) {
    return this.authService.register(createPatientUserDto);
  }

  @Post('psychologists')
  createPsychologist(@Body() createPsychologistUserDto: CreatePsychologistUserDto) {
    return this.authService.register(createPsychologistUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login( loginUserDto );
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus( user );
  }
}
