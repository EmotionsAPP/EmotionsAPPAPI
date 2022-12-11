import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { UpdatePatientUserDto, UpdatePsychologistUserDto, UserNotification } from './dto';
import { User } from './entities';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  findAllPsychologists() {
    return this.usersService.findAllPsychologists();
  }

  @Post('notification')
  sendNotification(@Body() userNotification: UserNotification) {
    this.usersService.pushNotification(userNotification);
  }

  @Get('psychologists/emergency-availables')
  findAllEmergencyAvailablePsychologists() {
    return this.usersService.findAllEmergencyAvailablePsychologists();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
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
