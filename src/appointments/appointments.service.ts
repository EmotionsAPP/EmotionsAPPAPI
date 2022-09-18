import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as moment from 'moment';

import { CreateAppointmentDto, FindAppointmentsDto, UpdateAppointmentDto } from './dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {

  private logger = new Logger('AppointmentService');

  constructor(
    @InjectModel( Appointment.name )
    private readonly appointmentModel: Model<Appointment>
  ) {}

  async create( createAppointmentDto: CreateAppointmentDto ) {

    await this.validateCollisions( createAppointmentDto );

    try {
      const appointment = await this.appointmentModel.create( createAppointmentDto );
      return appointment;
    } catch (error) {
      this.handleErrors( error );
    }
  }

  async findAll( appointment: FindAppointmentsDto ) {
    return await this.appointmentModel.find({
      $or: [{ psychologist: appointment.userId }, { patient: appointment.userId }],
      start: { $gte: moment.utc(appointment.date).startOf('day') },
      end: { $lte: moment.utc(appointment.date).endOf('day') }
    });
  }

  async findOne( id: string ) {
    
    const appointment = await this.appointmentModel.findById( id );

    if ( !appointment )
      throw new NotFoundException(`Appointment with id ${id} does not found`);

    await appointment.populate('psychologist');
    await appointment.populate('patient');

    return appointment;
  }

  async update( id: string, updateAppointmentDto: UpdateAppointmentDto ) {
    
    await this.validateCollisions( updateAppointmentDto );

    const appointment = await this.findOne( id );

    try {
      await appointment.updateOne( updateAppointmentDto );

      return { ...appointment, ...updateAppointmentDto };
    } catch (error) {
      this.handleErrors( error );
    }
  }

  private async validateCollisions( 
    appointment: CreateAppointmentDto | UpdateAppointmentDto 
  ) {
    
    const collisions = await this.appointmentModel.find({
      $or: [ 
        { psychologist: appointment.psychologist }, 
        { patient: appointment.patient } 
      ],
      start: { $lt: appointment.end },
      end: { $gt: appointment.start }
    });

    if ( collisions.length > 0 )
      throw new ConflictException("There is a conflict with the dates");
  }

  private handleErrors( error: any ) {

    this.logger.error( error );
    throw new InternalServerErrorException("Can't create or update Appoinment - Check server logs");
  }
}
