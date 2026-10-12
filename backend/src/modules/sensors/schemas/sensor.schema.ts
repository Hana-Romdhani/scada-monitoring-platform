import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SensorDocument = Sensor & Document;

@Schema({ timestamps: true })
export class Sensor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string; // e.g., 'TEMPERATURE', 'PRESSURE', 'VIBRATION'

  @Prop({ required: true })
  unit: string; // e.g., '°C', 'Bar', 'Hz'

  @Prop({ required: true })
  minVal: number;

  @Prop({ required: true })
  maxVal: number;

  @Prop({ type: Types.ObjectId, ref: 'Equipment', required: true })
  equipmentId: Types.ObjectId;

  @Prop({ default: 1 })
  frequency: number; // Update frequency in seconds

  @Prop({
    type: {
      warn: Number,
      crit: Number,
    },
    _id: false
  })
  thresholds: { warn: number; crit: number };
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
