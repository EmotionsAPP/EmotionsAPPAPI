import { ConflictException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Model } from 'mongoose';

import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import { createAppointment, createdAppointment, updateAppointment, updatedAppointment } from '../../test/data';

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
            create: jest.fn().mockReturnValue( createdAppointment ),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn()
              .mockReturnValueOnce( createdAppointment )
              .mockReturnValueOnce( undefined )
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

  describe('create', () => {
    it('should return the created appointment', async () => {
      jest.spyOn(model, "find").mockReturnValue([] as any);

      expect( await service.create( createAppointment ) ).toEqual( createdAppointment );
    });

    it('should throw conflict error if user appointment collides', async () => {
      jest.spyOn(model, "find").mockReturnValue([ createAppointment ] as any);

      try {
        await service.create( createAppointment );
      } catch (error) {
        expect( error ).toBeInstanceOf( ConflictException );
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      jest.spyOn(model, "find").mockReturnValue([ createdAppointment ] as any);
      
      expect(await service.findAll({
        userId: "1", 
        date: new Date("2022-09-16") 
      })).toEqual([ createdAppointment ]);
    });

    it('should return an empty array if userId does not exist', async () => {
      jest.spyOn(model, "find").mockReturnValue([] as any);
      
      expect(await service.findAll({
        userId: "-1", 
        date: new Date("2022-09-16") 
      })).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an appointment', async () => {
      expect( await service.findOne("1") ).toEqual( createdAppointment );
    });

    it('should throw not found error if id does not exist', async () => {
      try {
        await service.findOne("-1");
      } catch (error) {
        expect( error ).toBeInstanceOf( NotFoundException );
      }
    });
  });

  describe('update', () => {
    it('should return updated appointment', async () => {
      jest.spyOn(model, "find").mockReturnValueOnce([] as any);
      jest.spyOn(service, "findOne").mockReturnValueOnce( createdAppointment as any );
      
      expect( await service.update("1", updateAppointment) ).toEqual( updatedAppointment );
    });

    it('should throw conflict error if update appointment collides', async () => {
      jest.spyOn(model, "find").mockReturnValueOnce([ createdAppointment ] as any);
      
      try {
        await service.update("1", updateAppointment);
      } catch (error) {
        expect( error ).toBeInstanceOf( ConflictException );
      }
    });

    it('should throw not found error if id does not exist', async () => {
      jest.spyOn(model, "find").mockReturnValueOnce([] as any);
      jest.spyOn(service, "findOne").mockImplementationOnce((id: string) => {
        throw new NotFoundException();
      });
      
      try {
        await service.update("-1", updateAppointment);
      } catch (error) {
        expect( error ).toBeInstanceOf( NotFoundException );
      }
    });
  });
});
