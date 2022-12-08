import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { User } from './entities';
import { UserSchema } from './entities/user.entity';
import { ValidRoles } from '../auth/interfaces';
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          
          schema.pre<User>('save', function (next: Function) {
            if (!this.psychologist) 
              this.role = ValidRoles.Patient;
            else 
              this.role = ValidRoles.Psychologist;

            next();
          });

          return schema;
        }
      },
    ]),

    PassportModule,

    PuppeteerModule.forRoot()
  ],
  controllers: [ UsersController ],
  providers: [ UsersService ],
  exports: [ MongooseModule, UsersService ],
})
export class UsersModule {}
