import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';

import { CreatePatientUserDto, CreatePsychologistUserDto } from '../users/dto';
import { LoginUserDto } from './dto';
import { ValidRoles } from './interfaces';
import { User } from '../users/entities';

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

  @Post('login/patients')
  loginPatient(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login( loginUserDto, ValidRoles.Patient );
  }

  @Post('login/psychologists')
  loginPsychologist(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login( loginUserDto, ValidRoles.Psychologist );
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus( user );
  }
}
