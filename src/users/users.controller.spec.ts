import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { usersArray } from '../../test/data';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  CreatePsychologistUserDto,
  CreateUserDto,
  UpdatePatientUserDto,
  UpdatePsychologistUserDto
} from './dto';

const createdPsy = {
  _id: '4',
  taxId: '12392142935',
  firstName: 'Liz',
  lastName: 'Campusano',
  email: 'liz@gmail.com',
  password: 'L123asf2',
  isActive: true,
  psychologist: {
    codopsi: '1294323'
  }
};

const newPsy = new CreatePsychologistUserDto();
newPsy.taxId = '12392142935';
newPsy.firstName = 'Liz';
newPsy.lastName = 'Campusano';
newPsy.email = 'liz@gmail.com';
newPsy.password = 'L123asf2';
newPsy.psychologist = { codopsi: '1294323' };

const updatePsy = usersArray[0];
updatePsy.firstName = "Juan";

const updatePatient = usersArray[2];
updatePatient.firstName = "Juan";

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAllPsychologists: jest.fn(),
            findOne: jest.fn()
              .mockImplementationOnce((id: string) => usersArray.find(x => x._id === id))
              .mockImplementationOnce((id: string) => { throw new NotFoundException() })
              .mockImplementationOnce((id: string) => { throw new NotFoundException() }),
            create: jest.fn()
              .mockImplementationOnce((user: CreateUserDto) => createdPsy)
              .mockImplementationOnce((user: CreateUserDto) => { throw new ConflictException() }),
            update: jest.fn()
              .mockImplementationOnce((id: string) => ({ ...createdPsy, isActive: false })),
            updatePsychologist: jest.fn()
              .mockImplementationOnce((psychologist: UpdatePsychologistUserDto) => updatePsy)
              .mockImplementationOnce((psychologist: UpdatePsychologistUserDto) => { throw new NotFoundException() }),
            updatePatient: jest.fn()
              .mockImplementationOnce((patient: UpdatePatientUserDto) => updatePatient)
              .mockImplementationOnce((patient: UpdatePatientUserDto) => { throw new NotFoundException() })
          }
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllPsychologists', () => {
    it('should return an array of active psychologists', () => {
      jest.spyOn(service, "findAllPsychologists").mockReturnValueOnce(
        usersArray.filter(x => x.psychologist && x.isActive) as any
      );

      expect(controller.findAllPsychologists()).toEqual([usersArray[0]]);
    });
  });

  describe('findOne', () => {
    it('should return an user if id exists', () => {
      expect(controller.findOne('1')).toEqual(usersArray[0]);
    });

    it('should throw not found if id does not exist', () => {
      try {
        controller.findOne('15');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw not found if is not active', () => {
      try {
        controller.findOne('4');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('updatePsychologist', () => {
    it('should return the updated psychologist', () => {
      expect(controller.updatePsychologist("1", updatePsy)).toEqual(updatePsy);
    });

    it('should throw not found error if id does not exist', () => {
      try {
        controller.updatePsychologist("4", updatePsy);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('updatePatient', () => {
    it('should return the updated patient', () => {
      expect(controller.updatePatient("3", updatePatient)).toEqual(updatePatient);
    });

    it('should throw not found error if id does not exist', () => {
      try {
        controller.updatePatient("4", updatePatient);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should has isActive false', () => {
      expect(controller.remove('4')).toEqual({ ...createdPsy, isActive: false });
    });
  });
});
