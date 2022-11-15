import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';

import { Appointment, AppointmentSchema } from './entities/appointment.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Appointment.name,
        schema: AppointmentSchema
      }
    ]),

    UsersModule,

    AuthModule
  ],
  controllers: [ AppointmentsController ],
  providers: [ AppointmentsService ],
  exports: [ MongooseModule, AppointmentsService ]
})
export class AppointmentsModule {}
