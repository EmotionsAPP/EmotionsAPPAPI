import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let model: Model<Appointment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getModelToken( Appointment.name ),
          useValue: {
            findOne: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<AppointmentsService>( AppointmentsService );
    model = module.get<Model<Appointment>>( getModelToken( Appointment.name ) );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
