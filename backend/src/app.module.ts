import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SitesModule } from './modules/sites/sites.module';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { SensorsModule } from './modules/sensors/sensors.module';
import { MeasurementsModule } from './modules/measurements/measurements.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { AlarmsModule } from './modules/alarms/alarms.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/scada_db'),
    SitesModule,
    EquipmentModule,
    SensorsModule,
    MeasurementsModule,
    RealtimeModule,
    AlarmsModule,
  ],
})
export class AppModule {}
