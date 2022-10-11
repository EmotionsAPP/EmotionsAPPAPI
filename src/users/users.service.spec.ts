import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { MongoError } from 'mongodb';

import { usersArray } from '../../test/data';

import { User } from './entities';
import { UsersService } from './users.service';
import { CreatePatientUserDto, CreatePsychologistUserDto } from './dto';

const duplicateError = new MongoError("");
duplicateError.code = 11000;

const newPsy = new CreatePsychologistUserDto();
newPsy.firstName = 'Liz';
newPsy.lastName = 'Campusano';
newPsy.email = 'liz@gmail.com';
newPsy.password = 'L123asf2';
newPsy.psychologist = { idCardNo: '12392142935' };

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken( User.name ),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            select: jest.fn(),
            create: jest.fn(),
            updateOne: jest.fn(),
            findOneAndUpdate: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>( UsersService );
    model = module.get<Model<User>>( getModelToken( User.name ) );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return user if id exists', async () => {
      jest.spyOn(model, "findOne").mockReturnValueOnce(usersArray[0] as any);

      expect(await service.findOne('1')).toEqual(usersArray.find(x => x._id === '1'));
    });

    it('should throw not found error if id does not exist', async () => {
      jest.spyOn(model, "findOne").mockReturnValueOnce(undefined);

      try {
        await service.findOne('15');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw not found error if user is not active', async () => {
      jest.spyOn(model, "findOne").mockReturnValueOnce(undefined);

      try {
        await service.findOne('2');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findAllPsychologists', () => {
    it('should return all psychologists', async () => {
      jest.spyOn(model, "find").mockReturnValueOnce({
        select: jest.fn().mockResolvedValueOnce([usersArray[0]])
      } as any);

      expect(await service.findAllPsychologists()).toEqual([usersArray[0]]);
    });
  });

  describe('create', () => {
    it('should return the psychologist created', async () => {
      const createdPsy = {
        _id: '4',
        firstName: 'Liz',
        lastName: 'Campusano',
        email: 'liz@gmail.com',
        password: 'L123asf2',
        isActive: true,
        psychologist: {
          idCardNo: '12392142935'
        }
      };

      jest.spyOn(model, "create").mockImplementationOnce(() => 
        Promise.resolve(createdPsy),
      );
      
      expect(await service.create(newPsy)).toEqual(createdPsy);
    });

    it('should return the patient created', async () => {
      const createdPatient = {
        _id: '5',
        firstName: 'Ale',
        lastName: 'Veloz',
        email: 'ale@gmail.com',
        password: 'L123asf2',
        isActive: true,
        patient: {}
      };

      jest.spyOn(model, "create").mockImplementationOnce(() => 
        Promise.resolve(createdPatient),
      );

      const newPatient = new CreatePatientUserDto();
      newPatient.firstName = 'Liz';
      newPatient.lastName = 'Campusano';
      newPatient.email = 'liz@gmail.com';
      newPatient.password = 'L123asf2';
      newPatient.patient = {};
      
      expect(await service.create(newPatient)).toEqual(createdPatient);
    });

    it('should throw conflict error if id already exists', async () => {
      jest.spyOn(model, "create").mockImplementationOnce(() => {
        throw duplicateError;
      });

      try {
        await service.create(newPsy);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw conflict error if email already exists', async () => {
      jest.spyOn(model, "create").mockImplementationOnce(() => {
        throw duplicateError;
      });

      try {
        await service.create(newPsy);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw conflict error if psychologist codopsi already exists', async () => {
      jest.spyOn(model, "create").mockImplementationOnce(() => {
        throw duplicateError;
      });

      const newPsy = new CreatePsychologistUserDto();

      try {
        await service.create(newPsy);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('update', () => {
    const updateUser: any = newPsy;
    updateUser.firstName = "Juan";

    it('should return the user updated', async () => {
      jest.spyOn(service, "findOne")
        .mockReturnValueOnce(usersArray[0] as any)
        .mockReturnValueOnce(updateUser);

      expect(await service.update("1", updateUser)).toEqual(updateUser);
    });

    it('should throw not found error if id does not exist', async () => {
      jest.spyOn(service, "findOne").mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      try {
        await service.update("1", updateUser);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw conflict error if email already exists', async () => {
      const userDb: any = usersArray[0];
      userDb.updateOne = jest.fn().mockImplementationOnce(() => {
        throw duplicateError;
      });

      jest.spyOn(service, "findOne").mockReturnValueOnce(userDb);

      try {
        await service.update("1", updateUser);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw conflict error if idCardNo already exists', async () => {
      const userDb: any = usersArray[0];
      userDb.updateOne = jest.fn().mockImplementationOnce(() => {
        throw duplicateError;
      });

      jest.spyOn(service, "findOne").mockReturnValueOnce(userDb);

      try {
        await service.update("1", updateUser);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('updatePsychologist', () => {
    const updatePsy: any = newPsy;
    updatePsy.firstName = "Juan";

    it('should return the psychologist updated', async () => {
      jest.spyOn(service, "findOne")
        .mockReturnValueOnce(usersArray[0] as any)
        .mockReturnValueOnce(updatePsy);

      expect(await service.updatePsychologist("1", updatePsy)).toEqual(updatePsy);
    });

    it('should throw not found error if id does not exist', async () => {
      jest.spyOn(service, "findOne").mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      try {
        await service.updatePsychologist("1", updatePsy);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw conflict error if email already exists', async () => {
      const userDb: any = usersArray[0];
      userDb.updateOne = jest.fn().mockImplementationOnce(() => {
        throw duplicateError;
      });

      jest.spyOn(service, "findOne").mockReturnValueOnce(userDb);

      try {
        await service.updatePsychologist("1", updatePsy);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw conflict error if idCardNo already exists', async () => {
      const userDb: any = usersArray[0];
      userDb.updateOne = jest.fn().mockImplementationOnce(() => {
        throw duplicateError;
      });

      jest.spyOn(service, "findOne").mockReturnValueOnce(userDb);

      try {
        await service.updatePsychologist("1", updatePsy);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw conflict error if psychologist codopsi already exists', async () => {
      jest.spyOn(service, "findOne").mockReturnValueOnce(usersArray[0] as any);
      
      jest.spyOn(model, "findOneAndUpdate").mockImplementationOnce(() => {
        throw duplicateError;
      });

      try {
        await service.updatePsychologist("1", updatePsy);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('updatePatient', () => {
    const updatePatient: any = newPsy;
    updatePatient.firstName = "Juan";

    it('should return the patient updated', async () => {
      jest.spyOn(service, "findOne")
        .mockReturnValueOnce(usersArray[2] as any)
        .mockReturnValueOnce(updatePatient);

      expect(await service.updatePatient("1", updatePatient)).toEqual(updatePatient);
    });

    it('should throw not found error if id does not exist', async () => {
      jest.spyOn(service, "findOne").mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      try {
        await service.updatePsychologist("1", updatePatient);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw conflict error if email already exists', async () => {
      const userDb: any = usersArray[0];
      userDb.updateOne = jest.fn().mockImplementationOnce(() => {
        throw duplicateError;
      });

      jest.spyOn(service, "findOne").mockReturnValueOnce(userDb);

      try {
        await service.updatePsychologist("1", updatePatient);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw internal server error if throw unexpected error', async () => {
      const userDb: any = usersArray[0];
      userDb.updateOne = jest.fn().mockImplementationOnce(() => {
        throw new MongoError("");
      });

      jest.spyOn(service, "findOne").mockReturnValueOnce(userDb);

      try {
        await service.updatePsychologist("1", updatePatient);
      } catch (error) {
        expect(error).toBeInstanceOf( InternalServerErrorException );
      }
    });
  });
});
