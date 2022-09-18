import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppointmentsService } from './appointments.service';

import { CreateAppointmentDto, FindAppointmentsDto, UpdateAppointmentDto } from './dto';
import { Appointment } from './entities/appointment.entity';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.create( createAppointmentDto );
  }

  @Get()
  findAll(@Query() findAppointmentsDto: FindAppointmentsDto): Promise<Appointment[]> {
    return this.appointmentsService.findAll( findAppointmentsDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentsService.findOne( id );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update( id, updateAppointmentDto );
  }

  @Delete(':id')
  disable(@Param('id') id: string) {
    return this.appointmentsService.update( id, { isActive: false } );
  }
}
