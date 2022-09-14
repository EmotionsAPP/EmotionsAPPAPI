import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [ SeedController ],
  providers: [ SeedService ],
})
export class SeedModule {}
