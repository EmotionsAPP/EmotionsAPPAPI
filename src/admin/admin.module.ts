import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

import AdminJS from 'adminjs';
import { AdminModule as AdminJSModule } from '@adminjs/nestjs';
import { Model } from 'mongoose';
import * as AdminJSMongoose from '@adminjs/mongoose';

import { UsersModule } from '../users/users.module';
import { ArticlesModule } from '../articles/articles.module';
import { AppointmentsModule } from '../appointments/appointments.module';
import { CitiesModule } from '../cities/cities.module';

import { User } from '../users/entities';
import { Article } from '../articles/entities/article.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { City } from '../cities/entities';
import { UsersService } from '../users/users.service';
import { AppointmentsService } from '../appointments/appointments.service';

import { brandingOptions, localeOptions } from './config';
import { bundleDashboard, getAdminResources } from './helpers';

const authenticate = async (email: string, password: string) => {
  const USER = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  }

  if (email === USER.email && password === USER.password) 
    return Promise.resolve(USER);
  return null;
}

AdminJS.registerAdapter(AdminJSMongoose);

@Module({
  imports: [
    ConfigModule,

    MongooseModule,

    UsersModule,

    ArticlesModule,

    AppointmentsModule,

    CitiesModule,

    AdminJSModule.createAdminAsync({
      imports: [
        ConfigModule,
        UsersModule,
        ArticlesModule,
        AppointmentsModule,
        CitiesModule,
      ],
      inject: [
        getModelToken( User.name ),
        getModelToken( Article.name ),
        getModelToken( Appointment.name ),
        getModelToken( City.name ),
        UsersService,
        AppointmentsService,
        ConfigService
      ],
      useFactory: async (
        userModel: Model<User>,
        articleModel: Model<Article>,
        appointmentModel: Model<Appointment>,
        cityModel: Model<City>,
        usersService: UsersService,
        appointmentsService: AppointmentsService,
        configService: ConfigService
      ) => {
        
        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: getAdminResources(userModel, articleModel, appointmentModel, cityModel),
            branding: brandingOptions,
            locale: localeOptions,
            dashboard: bundleDashboard(usersService, appointmentsService),
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: configService.get('ADMIN_COOKIE_PASSWORD'),
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: configService.get('ADMIN_SESSION_SECRET'),
          },
        }
      }
    }),
  ],
  exports: [ AdminJSModule ]
})
export class AdminModule {}
