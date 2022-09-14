import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';

import { Appointment, AppointmentSchema } from './entities/appointment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Appointment.name,
        schema: AppointmentSchema
      }
    ]),

    PassportModule
  ],
  controllers: [ AppointmentsController ],
  providers: [ AppointmentsService ]
})
export class AppointmentsModule {}
