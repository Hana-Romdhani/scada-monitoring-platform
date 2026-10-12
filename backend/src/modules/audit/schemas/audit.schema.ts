import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ timestamps: true })
export class AuditLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  action: string; // e.g., 'ACKNOWLEDGE_ALARM', 'UPDATE_THRESHOLD'

  @Prop({ required: true })
  entity: string; // e.g., 'ALARM', 'SENSOR'

  @Prop({ type: Types.ObjectId })
  entityId: Types.ObjectId;

  @Prop()
  oldValue: any;

  @Prop()
  newValue: any;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
