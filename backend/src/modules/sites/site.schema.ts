import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SiteDocument = Site & Document;

@Schema({ timestamps: true })
export class Site {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  location: string;

  @Prop()
  description: string;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
