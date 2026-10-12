import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sensor, SensorDocument } from './schemas/sensor.schema';

@Injectable()
export class SensorsService {
  constructor(@InjectModel(Sensor.name) private sensorModel: Model<SensorDocument>) {}

  async create(createSensorDto: any): Promise<Sensor> {
    const createdSensor = new this.sensorModel(createSensorDto);
    return createdSensor.save();
  }

  async findAll(): Promise<Sensor[]> {
    return this.sensorModel.find().populate('equipmentId').exec();
  }

  async findOne(id: string): Promise<Sensor> {
    return this.sensorModel.findById(id).populate('equipmentId').exec();
  }

  async update(id: string, updateSensorDto: any): Promise<Sensor> {
    return this.sensorModel.findByIdAndUpdate(id, updateSensorDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.sensorModel.findByIdAndDelete(id).exec();
  }
}
