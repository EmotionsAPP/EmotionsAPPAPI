import { Module } from '@nestjs/common';
import { ExpoNotificationAdapter } from './adapters';

@Module({
  providers: [ ExpoNotificationAdapter ],
  exports: [ ExpoNotificationAdapter ]
})
export class CommonModule {}
