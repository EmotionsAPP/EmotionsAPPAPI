import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { User } from './entities';
import { UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    PassportModule
  ],
  controllers: [ UsersController ],
  providers: [ UsersService ],
  exports: [ MongooseModule, UsersService ],
})
export class UsersModule {}
