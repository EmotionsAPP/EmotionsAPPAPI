import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Log, LogSchema } from './entities/log.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: LogSchema
      }
    ])
  ],
  exports: [ MongooseModule ]
})
export class LogsModule {}
