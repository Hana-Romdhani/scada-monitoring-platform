import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Alarm, AlarmSchema } from './schemas/alarm.schema';
import { AlarmsService } from './services/alarms.service';
import { SensorsModule } from '../sensors/sensors.module';
import { RealtimeModule } from '../realtime/realtime.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Alarm.name, schema: AlarmSchema }]),
    SensorsModule,
    RealtimeModule,
  ],
  providers: [AlarmsService],
  exports: [AlarmsService],
})
export class AlarmsModule {}
