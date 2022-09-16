import { Module } from '@nestjs/common';
import { CallingsService } from './callings.service';
import { CallingsGateway } from './callings.gateway';

@Module({
  providers: [CallingsGateway, CallingsService]
})
export class CallingsModule {}
