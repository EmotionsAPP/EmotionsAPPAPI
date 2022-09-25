import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { createAppointment, createdAppointment, updateAppointment, updatedAppointment } from '../../test/data';
import { CreateAppointmentDto, FindAppointmentsDto, UpdateAppointmentDto } from './dto';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        {
          provide: AppointmentsService,
          useValue: {
            create: jest.fn()
              .mockImplementationOnce((create: CreateAppointmentDto) => createdAppointment)
              .mockImplementationOnce(() => { throw new ConflictException(); }),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<AppointmentsController>( AppointmentsController );
    service = module.get<AppointmentsService>( AppointmentsService );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return the created appointment', async () => {
      expect( await controller.create( createAppointment ) ).toEqual( createdAppointment );
    });

    it('should throw conflict error if user appointment collide', async () => {
      try {
        await controller.create( createAppointment );
      } catch (error) {
        expect( error ).toBeInstanceOf( ConflictException );
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      jest.spyOn(service, "findAll").mockImplementationOnce(
        (findAll: FindAppointmentsDto) => [ createdAppointment ] as any
      );

      expect(await controller.findAll({
        userId: "1", 
        date: new Date("2022-09-16") 
      })).toEqual([ createdAppointment ]);
    });

    it('should return an empty array if userId does not exist', async () => {
      jest.spyOn(service, "findAll").mockImplementationOnce(
        (findAll: FindAppointmentsDto) => [] as any
      );

      expect(await controller.findAll({
        userId: "-1", 
        date: new Date("2022-09-16") 
      })).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an appointment', async () => {
      jest.spyOn(service, "findOne").mockImplementationOnce((id: string) => createdAppointment as any);

      expect( await controller.findOne("1") ).toEqual( createdAppointment );
    });

    it('should throw not found error if id does not exist', async () => {
      jest.spyOn(service, "findOne").mockImplementationOnce(
        (id: string) => { throw new NotFoundException(); }
      );

      try {
        await controller.findOne("-1");
      } catch (error) {
        expect( error ).toBeInstanceOf( NotFoundException );
      }
    });
  });

  describe('update', () => {
    it('should return updated appointment', async () => {
      jest.spyOn(service, "update").mockImplementationOnce(
        (id: string, update: UpdateAppointmentDto) => updatedAppointment as any
      );

      expect( await controller.update("1", updateAppointment) ).toEqual( updatedAppointment );
    });

    it('should throw conflict error if update appointment collide', async () => {
      jest.spyOn(service, "update").mockImplementationOnce(
        (id: string, update: UpdateAppointmentDto) => { throw new ConflictException(); }
      );
      
      try {
        await controller.update("1", updateAppointment);
      } catch (error) {
        expect( error ).toBeInstanceOf( ConflictException );
      }
    });

    it('should throw not found error if id does not exist', async () => {
      jest.spyOn(service, "update").mockImplementationOnce(
        (id: string, update: UpdateAppointmentDto) => { throw new NotFoundException(); }
      );

      try {
        await controller.update("-1", updateAppointment);
      } catch (error) {
        expect( error ).toBeInstanceOf( NotFoundException );
      }
    });
  });

  describe('disable', () => {
    it('should return appointment with isActive false', async () => {
      jest.spyOn(service, "update").mockImplementation(
        (id: string, update: UpdateAppointmentDto) => ({ ...createdAppointment, isActive: false }) as any
      );

      expect(await controller.disable("1")).toEqual({ ...createdAppointment, isActive: false });
    });
  });
});
