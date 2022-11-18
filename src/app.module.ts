import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ArticlesModule } from './articles/articles.module';
import { CallingsModule } from './callings/callings.module';

import { AdminModule } from '@adminjs/nestjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import { User } from './users/entities';
import { Article } from './articles/entities/article.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { Model } from 'mongoose';
import { UsersService } from './users/users.service';
import { AppointmentsService } from './appointments/appointments.service';
import React from 'react';

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
    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGODB),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),

    AuthModule,
    
    UsersModule,

    SeedModule,

    AppointmentsModule,

    ArticlesModule,

    CallingsModule,

    AdminModule.createAdminAsync({
      imports: [
        UsersModule,
        ArticlesModule,
        AppointmentsModule,
      ],
      inject: [
        getModelToken( User.name ),
        getModelToken( Article.name ),
        getModelToken( Appointment.name ),
        UsersService,
        AppointmentsService
      ],
      useFactory: (
        userModel: Model<User>,
        articleModel: Model<Article>,
        appointmentModel: Model<Appointment>,
        usersService: UsersService,
        appointmentsService: AppointmentsService
      ) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            { resource: userModel },
            { resource: articleModel },
            { resource: appointmentModel },
          ],
          branding: {
            companyName: 'Emotions APP',
            softwareBrothers: false,
            withMadeWithLove: false,
            logo: 'https://estintecedu-my.sharepoint.com/personal/1096192_est_intec_edu_do/Documents/Emotions%20APP%20-%20Documentaci%C3%B3n/Project%20Documents/Logo%20-%20Large.png',
            favicon: 'https://estintecedu-my.sharepoint.com/personal/1096192_est_intec_edu_do/Documents/Emotions%20APP%20-%20Documentaci%C3%B3n/Project%20Documents/emotions_icon.png',
            theme: {
              colors: {
                primary100: "rgba(219, 101, 81, 0.99)",
                primary60: "#ffffff",
                primary20: "#E6896B",
                hoverBg: "#E6896B"
              }
            },
          },
          locale: {
            language: "es",
            translations: {
              messages: {
                loginWelcome: 'Administration Site for Emotions APP.'
              },
            },
          },
          dashboard: {
            handler: async () => {
              const usersQuantityByRole = await usersService.getUsersQuantityByRole();
              const appointmentsQuantitiesPerDay = await appointmentsService.getAppointmentsQuantitiesPerDay();
              const emergencyAvailablesCount = await usersService.getEmergencyAvailablePsychologiesCount();

              return {
                usersQuantityByRole,
                appointmentsQuantitiesPerDay,
                emergencyAvailablesCount
              }
            },
            component: AdminJS.bundle('../public/components/Dashboard'),
          },
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret'
        },
      })
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
