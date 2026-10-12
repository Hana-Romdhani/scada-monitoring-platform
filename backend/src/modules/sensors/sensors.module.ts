import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sensor, SensorSchema } from './schemas/sensor.schema';
import { SensorsService } from './services/sensors.service';
import { SensorsController } from './controllers/sensors.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sensor.name, schema: SensorSchema }])],
  controllers: [SensorsController],
  providers: [SensorsService],
  exports: [SensorsService],
})
export class SensorsModule {}
