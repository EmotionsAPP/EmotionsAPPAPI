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
import { LogsModule } from '../logs/logs.module';

import { User } from '../users/entities';
import { Article } from '../articles/entities/article.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { City } from '../cities/entities';
import { Log } from '../logs/entities/log.entity';
import { UsersService } from '../users/users.service';
import { AppointmentsService } from '../appointments/appointments.service';

import { Admin, AdminSchema } from './entities';
import { brandingOptions, localeOptions } from './config';
import { authenticateWrapper, bundleDashboard, getAdminResources } from './helpers';

AdminJS.registerAdapter(AdminJSMongoose);

@Module({
  imports: [
    ConfigModule,

    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema
      }
    ]),

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
        LogsModule,
        MongooseModule.forFeature([
          {
            name: Admin.name,
            schema: AdminSchema
          }
        ]),
      ],
      inject: [
        getModelToken( User.name ),
        getModelToken( Article.name ),
        getModelToken( Appointment.name ),
        getModelToken( City.name ),
        getModelToken( Admin.name ),
        getModelToken( Log.name ),
        UsersService,
        AppointmentsService,
        ConfigService,
      ],
      useFactory: async (
        userModel: Model<User>,
        articleModel: Model<Article>,
        appointmentModel: Model<Appointment>,
        cityModel: Model<City>,
        adminModel: Model<Admin>,
        logModel: Model<Log>,
        usersService: UsersService,
        appointmentsService: AppointmentsService,
        configService: ConfigService
      ) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: getAdminResources(userModel, articleModel, appointmentModel, cityModel, adminModel, logModel),
          branding: brandingOptions,
          locale: localeOptions,
          dashboard: bundleDashboard(usersService, appointmentsService),
        },
        auth: {
          authenticate: authenticateWrapper(adminModel),
          cookieName: 'adminjs',
          cookiePassword: configService.get('ADMIN_COOKIE_PASSWORD'),
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: configService.get('ADMIN_SESSION_SECRET'),
        },
      })
    }),
  ],
  exports: [ AdminJSModule ]
})
export class AdminModule {}
