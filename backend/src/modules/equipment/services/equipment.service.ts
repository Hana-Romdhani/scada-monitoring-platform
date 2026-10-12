import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Equipment, EquipmentDocument } from './schemas/equipment.schema';

@Injectable()
export class EquipmentService {
  constructor(@InjectModel(Equipment.name) private equipmentModel: Model<EquipmentDocument>) {}

  async create(createEquipmentDto: any): Promise<Equipment> {
    const createdEquipment = new this.equipmentModel(createEquipmentDto);
    return createdEquipment.save();
  }

  async findAll(): Promise<Equipment[]> {
    return this.equipmentModel.find().populate('siteId').exec();
  }

  async findOne(id: string): Promise<Equipment> {
    return this.equipmentModel.findById(id).populate('siteId').exec();
  }

  async update(id: string, updateEquipmentDto: any): Promise<Equipment> {
    return this.equipmentModel.findByIdAndUpdate(id, updateEquipmentDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.equipmentModel.findByIdAndDelete(id).exec();
  }
}
