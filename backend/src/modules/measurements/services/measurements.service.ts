import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Measurement, MeasurementDocument } from './schemas/measurement.schema';
import { RealtimeGateway } from '../../realtime/gateways/realtime.gateway';
import { AlarmsService } from '../../alarms/services/alarms.service';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectModel(Measurement.name) private measurementModel: Model<MeasurementDocument>,
    private readonly realtimeGateway: RealtimeGateway,
    private readonly alarmsService: AlarmsService,
  ) {}

  async create(createMeasurementDto: any): Promise<Measurement> {
    const measurement = new this.measurementModel(createMeasurementDto);
    const savedMeasurement = await measurement.save();

    // 1. PUSH TO REALTIME GATEWAY
    this.realtimeGateway.emitMeasurementUpdate(savedMeasurement);

    // 2. CHECK ALARM THRESHOLDS
    await this.alarmsService.checkThresholds(
      savedMeasurement.sensorId.toString(),
      savedMeasurement.value
    );

    return savedMeasurement;
  }

  async findLatest(sensorId: string): Promise<Measurement> {
    return this.measurementModel.findOne({ sensorId }).sort({ timestampSource: -1 }).exec();
  }

  async findHistory(sensorId: string, start: Date, end: Date): Promise<Measurement[]> {
    return this.measurementModel.find({
      sensorId,
      timestampSource: { $gte: start, $lte: end },
    }).sort({ timestampSource: 1 }).exec();
  }
}
