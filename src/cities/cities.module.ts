import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';

import { City, CitySchema } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: City.name,
        schema: CitySchema
      }
    ])
  ],
  controllers: [ CitiesController ],
  providers: [ CitiesService ],
  exports: [ MongooseModule, CitiesService ]
})
export class CitiesModule {}
