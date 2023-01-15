import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

import { AppointmentsService } from './appointments.service';

import { CreateAppointmentDto, FindAppointmentsDto, AppointmentsPaginationDto, UpdateAppointmentDto } from './dto';
import { Appointment } from './entities/appointment.entity';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.create( createAppointmentDto );
  }

  @SkipThrottle()
  @Get()
  find(@Query() findAppointmentsDto: FindAppointmentsDto): Promise<Appointment[]> {
    return this.appointmentsService.find( findAppointmentsDto );
  }

  @Get("/user/:id")
  getUsersAppointments(@Param('id') userId: string) {
    return this.appointmentsService.getUsersAppointments( userId );
  }

  @Get("/history")
  getHistory(@Query() getHistoryAppointments: AppointmentsPaginationDto) {
    return this.appointmentsService.getHistory( getHistoryAppointments );
  }

  @Get("/contacted-users")
  getContactedUsers(@Query() appointmentsPagination: AppointmentsPaginationDto) {
    return this.appointmentsService.getContactedUsers( appointmentsPagination );
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
