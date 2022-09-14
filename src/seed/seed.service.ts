import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from '../users/entities';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( User.name )
    private readonly usersModel: Model<User>
  ) {}

  async cleanDataBase() {
    await this.cleanUsers();
  }

  private async cleanUsers() {
    await this.usersModel.deleteMany({});
  }
}
