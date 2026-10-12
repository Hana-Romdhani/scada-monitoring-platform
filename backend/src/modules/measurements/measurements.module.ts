import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Measurement, MeasurementSchema } from './schemas/measurement.schema';
import { MeasurementsService } from './services/measurements.service';
import { MeasurementsController } from './controllers/measurements.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Measurement.name, schema: MeasurementSchema }])],
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
  exports: [MeasurementsService],
})
export class MeasurementsModule {}
