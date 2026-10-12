import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipment, EquipmentSchema } from './schemas/equipment.schema';
import { EquipmentService } from './services/equipment.service';
import { EquipmentController } from './controllers/equipment.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Equipment.name, schema: EquipmentSchema }])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
