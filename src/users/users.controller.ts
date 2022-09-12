import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';

import {
  CreatePatientUserDto,
  CreatePsychologistUserDto,
  UpdatePatientUserDto,
  UpdatePsychologistUserDto
} from './dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  findAllPsychologists() {
    return this.usersService.findAllPsychologists();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne( id );
  }

  @Patch('patients/:id')
  updatePatient(@Param('id') id: string, @Body() updateUserDto: UpdatePatientUserDto) {
    return this.usersService.updatePatient( id, updateUserDto );
  }

  @Patch('psychologists/:id')
  updatePsychologist(@Param('id') id: string, @Body() updateUserDto: UpdatePsychologistUserDto) {
    return this.usersService.updatePsychologist( id, updateUserDto );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.update( id, { isActive: false } );
  }
}
