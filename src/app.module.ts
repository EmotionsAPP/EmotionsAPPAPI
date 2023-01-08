import { join } from 'path';

import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ArticlesModule } from './articles/articles.module';
import { CallingsModule } from './callings/callings.module';
import { NotesModule } from './notes/notes.module';
import { AdminModule } from './admin/admin.module';
import { CitiesModule } from './cities/cities.module';
import { LogsModule } from './logs/logs.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGODB),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),

    AuthModule,
    
    UsersModule,

    SeedModule,

    AppointmentsModule,

    ArticlesModule,

    CallingsModule,

    NotesModule,

    AdminModule,

    CitiesModule,

    LogsModule,

    CommonModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
