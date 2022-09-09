import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { usersArray } from './users.service.spec';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreatePsychologistUserDto, CreateUserDto } from './dto';

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
            findOne: jest.fn()
              .mockImplementationOnce((id: string) => usersArray.find(x => x._id === id))
              .mockImplementationOnce((id: string) => { throw new NotFoundException() })
              .mockImplementationOnce((id: string) => { throw new NotFoundException() }),
            create: jest.fn()
              .mockImplementationOnce((user: CreateUserDto) => createdPsy)
              .mockImplementationOnce((user: CreateUserDto) => { throw new ConflictException() }),
            update: jest.fn()
              .mockImplementationOnce((id: string) => ({ ...createdPsy, isActive: false }))
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

  describe('createPsychologist', () => {
    it('should create new psychologist', () => {
      expect(controller.createPsychologist(newPsy)).toEqual(createdPsy);
    });

    it('should throw conflict error if id exists', () => {
      try {
        controller.createPsychologist(newPsy);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('remove', () => {
    it('should has isActive false', () => {
      expect(controller.remove('4')).toEqual({ ...createdPsy, isActive: false });
    });
  });
});
