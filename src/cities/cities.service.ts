import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from './entities';

@Injectable()
export class CitiesService {

  constructor(
    @InjectModel( City.name )
    private readonly cityModel: Model<City>
  ) {}

  async findAll() {
    return await this.cityModel.find({});
  }
}
