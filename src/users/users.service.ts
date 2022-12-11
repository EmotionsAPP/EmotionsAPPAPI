import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectBrowser } from 'nest-puppeteer';

import { Model } from 'mongoose';
import { Browser } from 'puppeteer';
import { hashPassword } from '../auth/security';

import {
  CreatePsychologistUserDto,
  CreateUserDto,
  UpdatePatientUserDto,
  UpdatePsychologistUserDto,
  UpdateUserDto
} from './dto';
import { User } from './entities';
import { MSPData, UsersQuantityByRole } from './interfaces';
import { formatIdCardNo, isPsychologist } from './helpers';

@Injectable()
export class UsersService {

  private logger = new Logger('UserService');

  constructor(
    @InjectModel( User.name )
    private readonly userModel: Model<User>,

    @InjectBrowser() 
    private readonly browser: Browser
  ) {}

  async create( createUserDto: CreateUserDto ): Promise<User | undefined> {
    
    try {
      createUserDto.password = await hashPassword( createUserDto.password );
      
      const user = await this.userModel.create( createUserDto );
      return user;
    } catch (error) {
      this.handleExceptions( error );
    }
  }

  async createPsychologist( psychologist: CreatePsychologistUserDto ): Promise<User | undefined> {

    const user = await this.userModel.findOne({ "psychologist.idCardNo": psychologist.psychologist.idCardNo });

    if (user)
      throw new ConflictException("Cedula already exists");

    const { title } = await this.getPsychologistInfo(psychologist.psychologist.idCardNo);

    if (!isPsychologist(title))
      throw new NotFoundException("Cedula not found in registry");

    return await this.create( psychologist );
  }

  async findAllPsychologists() {

    return await this.userModel.find({ 
      psychologist: { $ne: null }, 
      isActive: { $ne: false } 
    })
      .select('-__v')
      .populate('psychologist')
      .populate('city');
  }

  async findAllEmergencyAvailablePsychologists() {

    const psychologists = await this.findAllPsychologists();

    return psychologists.filter(psy => psy.psychologist.emergencyAvailable);
  }

  async findOne( id: string ): Promise<User> {

    const user = await this.userModel.findOne({ _id: id, isActive: { $ne: false } })
      .populate('psychologist')
      .populate('patient')
      .populate('city');

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

    const patientDbData: any = {};
    ({
      information: patientDbData.information,
      diagnostic: patientDbData.diagnostic,
    } = user.patient);

    const updatePatient = { ...patientDbData, ...patient };

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

    const psychologistDbData: any = {};
    ({
      idCardNo: psychologistDbData.idCardNo,
      emergencyAvailable: psychologistDbData.emergencyAvailable,
      title: psychologistDbData.title,
      firstWorkDate: psychologistDbData.firstWorkDate,
      about: psychologistDbData.about,
      goals: psychologistDbData.goals,
      workPlaces: psychologistDbData.workPlaces,
    } = user.psychologist);

    const updatePsychologist = { ...psychologistDbData, ...psychologist };

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

  async getUsersQuantityByRole(): Promise<UsersQuantityByRole> {
    const usersQuantityByRoleArr = await this.userModel.aggregate([{
      '$facet': {
        'patientsCount': [
          {
            '$match': {
              'isActive': { '$eq': true }, 
              'patient': { '$ne': null }
            }
          }, { '$count': 'patient' }
        ], 
        'psychologistCount': [
          {
            '$match': {
              'isActive': { '$eq': true }, 
              'psychologist': { '$ne': null }
            }
          }, { '$count': 'psychologist' }
        ]
      }
    }]);

    const usersQuantityByRole = usersQuantityByRoleArr[0];

    const patientsCount = usersQuantityByRole.patientsCount[0]?.patient;
    const psychologistsCount = usersQuantityByRole.psychologistCount[0]?.psychologist;
  
    return {
      patientsCount: (!patientsCount) ? 0 : patientsCount,
      psychologistsCount: (!psychologistsCount) ? 0 : psychologistsCount
    };
  }

  async getEmergencyAvailablePsychologiesCount() {
    const result = await this.userModel.aggregate([
      { 
        '$match': { 
          'isActive': { '$eq': true }, 
          'psychologist': { '$ne': null }
        }
      }, {
        '$facet': {
          'availablesCount': [
            {
              '$match': {
                'psychologist.emergencyAvailable': { '$eq': true }
              }
            }, {
              '$count': 'psychologist'
            }
          ], 
          'noAvailablesCount': [
            {
              '$match': {
                'psychologist.emergencyAvailable': { '$eq': false }
              }
            }, {
              '$count': 'psychologist'
            }
          ]
        }
      }
    ]);

    const availableQuantities = result[0];

    const availables = availableQuantities.availablesCount[0]?.psychologist;
    const noAvailables = availableQuantities.noAvailablesCount[0]?.psychologist;

    return {
      availables: (!availables) ? 0 : availables,
      noAvailables: (!noAvailables) ? 0 : noAvailables
    }
  }

  private async getPsychologistInfo(idCardNo: string): Promise<MSPData> {
    const page = await this.browser.newPage();
    await page.goto("https://intranet.msp.gob.do/intranet/juridica/publica/Consulta_Registro_Exequatur.aspx");

    await page.select("#DropDownListCriterio", "1");
    await page.waitForSelector("#TextBoxCedula");
    await page.type("#TextBoxCedula", idCardNo);

    try {
	    await page.click("#ButtonBuscar1");
	    await page.waitForSelector("#GridView1", { timeout: 10000 });
    } catch (error) {
      await page.close();

      if (idCardNo.indexOf("-") === -1) {
        let idCardNoFormatted = formatIdCardNo( idCardNo );
        return this.getPsychologistInfo( idCardNoFormatted );
      }

      throw new NotFoundException("Cedula not found in registry");
    }

    const info: MSPData[] = await page.$eval("#GridView1", el => {
      const table = [...el.querySelectorAll('tr')].map(row => {
        const columns = [...row.querySelectorAll('td')].map(x => x.innerHTML);
    
        return ({
          name: columns[2],
          cedula: columns[3],
          title: columns[4]
        });
      });
    
      return table;
    });

    await page.close();
    return info[1];
  }

  private handleExceptions(error: any) {
    if ( error.code === 11000 )
      throw new ConflictException(`User with ${ JSON.stringify( error.keyValue ) } already exists`);

    this.logger.error( error );
    throw new InternalServerErrorException("Can't create or update User - Check server logs");
  }
}
