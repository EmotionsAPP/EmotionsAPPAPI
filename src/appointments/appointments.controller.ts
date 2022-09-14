import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { AppointmentsService } from './appointments.service';

import {
  CreateAppointmentDto,
  FindAllAppointmentsDto,
  UpdateAppointmentDto
} from './dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create( createAppointmentDto );
  }

  @Get()
  findAll(@Body() findAllAppointmentsDto: FindAllAppointmentsDto) {
    return this.appointmentsService.findAll( findAllAppointmentsDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne( id );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update( id, updateAppointmentDto );
  }
}
