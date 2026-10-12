import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EquipmentDocument = Equipment & Document;

@Schema({ timestamps: true })
export class Equipment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({
    type: String,
    enum: ['RUNNING', 'STOPPED', 'FAULT'],
    default: 'STOPPED'
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @Prop()
  description: string;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
