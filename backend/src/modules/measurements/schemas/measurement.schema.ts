import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MeasurementDocument = Measurement & Document;

@Schema({ timestamps: { createdAt: 'timestampReceived', updatedAt: false } })
export class Measurement {
  @Prop({ type: Types.ObjectId, ref: 'Sensor', required: true, index: true })
  sensorId: Types.ObjectId;

  @Prop({ required: true, index: true })
  value: number;

  @Prop({ required: true, index: true })
  timestampSource: Date;

  @Prop({
    type: String,
    enum: ['GOOD', 'BAD', 'UNCERTAIN'],
    default: 'GOOD'
  })
  quality: string;

  @Prop({
    type: String,
    enum: ['SIMULATION', 'INDUSTRIAL'],
    default: 'SIMULATION'
  })
  origin: string;
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement);
// Index for time-series range queries
MeasurementSchema.index({ sensorId: 1, timestampSource: -1 });
