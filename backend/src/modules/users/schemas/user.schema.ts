import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    type: String,
    enum: ['ADMIN', 'ENGINEER', 'OPERATOR', 'VIEWER'],
    default: 'VIEWER'
  })
  role: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
