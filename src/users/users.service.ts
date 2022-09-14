import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  CreateUserDto,
  UpdatePatientUserDto,
  UpdatePsychologistUserDto,
  UpdateUserDto
} from './dto';
import { User } from './entities';

@Injectable()
export class UsersService {

  private logger = new Logger('UserService');

  constructor(
    @InjectModel( User.name )
    private readonly userModel: Model<User>,
  ) {}

  async create( createUserDto: CreateUserDto ) {
    
    try {
      const user = await this.userModel.create( createUserDto );
      return user;
    } catch (error) {
      this.handleExceptions( error );
    }
  }

  findAllPsychologists() {

    return this.userModel.find({ 
      psychologist: { $ne: null }, 
      isActive: { $ne: false } 
    }).select('-__v');
  }

  async findOne( id: string ): Promise<User> {

    const user = await this.userModel.findOne({ _id: id, isActive: { $ne: false } });

    if ( !user )
      throw new NotFoundException(`User with id ${ id } not found`);
    
    return user;
  }

  async update( id: string, updateUserDto: UpdateUserDto ) {

    const user = await this.findOne( id );

    try {
      await user.updateOne( updateUserDto );

      return await this.findOne( id );
    } catch(error) {
      this.handleExceptions( error );
    }
  }

  async updatePatient( id: string, updateUserDto: UpdatePatientUserDto ) {

    const user = await this.findOne( id );
    const { patient, ...updateUser } = updateUserDto;

    const updatePatient = { ...user.patient, ...patient };

    try {
      await user.updateOne( updateUser );
      await this.userModel.findOneAndUpdate(
        { _id: id },
        {
          "$set": {
            "patient": updatePatient
          }
        }
      );

      return await this.findOne( id );
    } catch(error) {
      this.handleExceptions( error );
    }
  }

  async updatePsychologist( id: string, updateUserDto: UpdatePsychologistUserDto ) {

    const user = await this.findOne( id );
    const { psychologist, ...updateUser } = updateUserDto;

    const updatePsychologist = { ...user.psychologist, ...psychologist };

    try {
      await user.updateOne( updateUser );
      await this.userModel.findOneAndUpdate(
        { _id: id },
        {
          "$set": {
            "psychologist": updatePsychologist
          }
        }
      );

      return await this.findOne( id );
    } catch(error) {
      this.handleExceptions( error );
    }
  }

  private handleExceptions(error: any) {
    if ( error.code === 11000 )
      throw new ConflictException(`User with ${ JSON.stringify( error.keyValue ) } already exists`);

    this.logger.error( error );
    throw new InternalServerErrorException("Can't create or update User - Check server logs");
  }
}
