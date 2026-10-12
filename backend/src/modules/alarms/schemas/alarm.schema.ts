import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AlarmDocument = Alarm & Document;

@Schema({ timestamps: true })
export class Alarm {
  @Prop({ type: Types.ObjectId, ref: 'Sensor', required: true, index: true })
  sensorId: Types.ObjectId;

  @Prop({ required: true })
  severity: 'WARNING' | 'CRITICAL';

  @Prop({ required: true })
  value: number;

  @Prop({
    type: String,
    enum: ['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'],
    default: 'ACTIVE'
  })
  status: string;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  ackUserId: Types.ObjectId;
}

export const AlarmSchema = SchemaFactory.createForClass(Alarm);
