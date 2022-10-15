import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Model } from 'mongoose';
import { MongoError } from 'mongodb';

import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import {
  appointmentsHistory,
  expectedAppointmentsHistory,
  createAppointment,
  createdAppointment,
  updateAppointment,
  updatedAppointment
} from '../../test/data';
import { EmptyLogger } from '../../test/interfaces';

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
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn()
          }
        }
      ],
    }).compile();
    module.useLogger(EmptyLogger);

    service = module.get<AppointmentsService>( AppointmentsService );
    model = module.get<Model<Appointment>>( getModelToken( Appointment.name ) );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created appointment', async () => {
      jest.spyOn(model, "find").mockReturnValue([] as any);
      jest.spyOn(model, "create").mockReturnValueOnce( createdAppointment as any );

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

    it('should throw internal server error if throw unexpected error', async () => {
      jest.spyOn(model, "find").mockReturnValue([] as any);
      jest.spyOn(model, "create").mockImplementationOnce((create: any) => { throw new MongoError(""); });

      try {
        await service.create( createAppointment );
      } catch (error) {
        expect( error ).toBeInstanceOf( InternalServerErrorException );
      }
    });
  });

  describe('find', () => {
    it('should return an array of appointments', async () => {
      jest.spyOn(model, "find").mockReturnValue([ createdAppointment ] as any);
      
      expect(await service.find({
        userId: "1", 
        date: new Date("2022-09-16") 
      })).toEqual([ createdAppointment ]);
    });

    it('should return an empty array if userId does not exist', async () => {
      jest.spyOn(model, "find").mockReturnValue([] as any);
      
      expect(await service.find({
        userId: "-1", 
        date: new Date("2022-09-16") 
      })).toEqual([]);
    });
  });

  describe('getHistory', () => {
    it('should return an array of appointments histories', async () => {
      jest.spyOn(model, "find").mockReturnValue({
        limit: () => ({
          skip: () => ({
            sort: jest.fn().mockReturnValue( appointmentsHistory )
          })
        })
      } as any);

      expect( await service.getHistory({ userId: "", limit: 5 }) )
        .toEqual( expectedAppointmentsHistory );
    });

    it('should return an empty array if userId does not exist', async () => {
      jest.spyOn(model, "find").mockReturnValue({
        limit: () => ({
          skip: () => ({ 
            sort: jest.fn().mockReturnValue( [] )
          })
        })
      } as any);

      expect( await service.getHistory({ userId: "", limit: 5 }) )
        .toEqual( [] );
    });
  });

  describe('findOne', () => {
    it('should return an appointment', async () => {
      jest.spyOn(model, "findById").mockReturnValueOnce( createdAppointment as any );

      expect( await service.findOne("1") ).toEqual( createdAppointment );
    });

    it('should throw not found error if id does not exist', async () => {
      jest.spyOn(model, "findById").mockResolvedValueOnce( undefined );

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

    it('should throw internal server error if throw unexpected error', async () => {
      jest.spyOn(model, "find").mockReturnValueOnce([] as any);
      jest.spyOn(service, "findOne").mockReturnValueOnce({ ...createdAppointment, 
        updateOne: jest.fn().mockImplementationOnce(() => { throw new MongoError(""); })
      } as any);
      
      try {
        await service.update("-1", updateAppointment);
      } catch (error) {
        expect( error ).toBeInstanceOf( InternalServerErrorException );
      }
    });
  });
});
