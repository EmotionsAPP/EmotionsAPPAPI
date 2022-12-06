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

import { CreateAppointmentDto, FindAppointmentsDto, AppointmentsPaginationDto, UpdateAppointmentDto } from './dto';
import { Appointment } from './entities/appointment.entity';
import { AppointmentStatus, FindAppointmentStatus } from './interfaces';
import { User } from '../users/entities';

@Injectable()
export class AppointmentsService {

  private logger = new Logger('AppointmentService');

  constructor(
    @InjectModel( Appointment.name )
    private readonly appointmentModel: Model<Appointment>,

    @InjectModel( User.name )
    private readonly userModel: Model<User>
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

  async find( appointment: FindAppointmentsDto ) {

    const { userId, date, excludeStatus = FindAppointmentStatus.Completed } = appointment; 

    const query = {
      $or: [{ psychologist: userId }, { patient: userId }],
      start: { 
        $gte: moment.utc( date ).startOf('day'),
        $lte: moment.utc( date ).endOf('day')
      },
      status: { $ne: excludeStatus },
      isActive: { $eq: true }
    }

    if (excludeStatus !== FindAppointmentStatus.None)
      query.status = { $ne: excludeStatus };

    return await this.appointmentModel.find(query)
      .sort({ start: 1 })
      .populate("psychologist")
      .populate("patient");
  }

  async getHistory( getHistoryAppointments: AppointmentsPaginationDto ) {

    const { userId, limit = 0, offset = 0 } = getHistoryAppointments;

    const appointments = await this.appointmentModel.find({
      $or: [
        { psychologist: userId }, 
        { patient: userId }
      ],
      status: AppointmentStatus.Completed
    })
      .limit( limit )
      .skip( offset )
      .sort({ start: -1 })
      .populate("psychologist")
      .populate("patient");

    return this.createAppointmentsHistory( appointments );
  }

  async getContactedUsers( appointmentsPagination: AppointmentsPaginationDto ) {

    const { userId, limit = 3, offset = 0, status = AppointmentStatus.Completed } = appointmentsPagination;

    const contactedUsersIds: {_id: string}[] = await this.appointmentModel.aggregate([
      { $match: {
        $or: [{ psychologist: userId, status: status }, { patient: userId, status: status }] },
      },
      {
        $group: { 
          _id: {
            $cond: { if: { $eq: [ "$psychologist", userId ] }, then: "$patient", else: "$psychologist" }
          }
        }
      },
      { $sort: { start: -1 } },
      { $limit: limit },
      { $skip: offset }
    ]);

    const contactedUsers = await this.userModel.find({
      _id: { $in: contactedUsersIds.map(user => user._id) }
    });

    return contactedUsers;
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

  async getAppointmentsQuantitiesPerDay() {
    return await this.appointmentModel.aggregate([
      {
        '$group': {
          '_id': {
            '$dateToString': {
              'format': '%Y-%m-%d', 
              'date': '$start'
            }
          }, 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }
    ]);
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
      end: { $gt: appointment.start },
      isActive: { $eq: true }
    });

    if ( collisions.length > 0 )
      throw new ConflictException("There is a conflict with the dates");
  }

  private async createAppointmentsHistory( appointments: Appointment[] ) {

    const appointmentsHistory = [];

    const dict = new Map<string, Appointment[]>();

    appointments.forEach((appointment: Appointment) => {
      let dateKey = moment( appointment.start ).format("YYYY-MM-DD");

      if ( dict.has( dateKey ) )
        dict.get( dateKey ).push( appointment );
      else
        dict.set(dateKey, [ appointment ]);
    });

    dict.forEach((value, key) => appointmentsHistory.push({ date: key, appointments: value }));

    return appointmentsHistory;
  }

  private handleErrors( error: any ) {

    this.logger.error( error );
    throw new InternalServerErrorException("Can't create or update Appoinment - Check server logs");
  }
}
