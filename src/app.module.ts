import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ArticlesModule } from './articles/articles.module';
import { CallingsModule } from './callings/callings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGODB),

    AuthModule,
    
    UsersModule,

    SeedModule,

    AppointmentsModule,

    ArticlesModule,

    CallingsModule,
  ],
})
export class AppModule {}
