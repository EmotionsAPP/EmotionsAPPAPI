import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Patient, Psychologist } from '.';

@Schema()
export class User extends Document {
  @Prop({ unique: true, index: true })
  taxId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  profileImage: string;

  @Prop()
  gender: string;

  @Prop()
  birthDate: Date;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop({ default: true })
  isActive: boolean;

  // @Prop({ type: Types.ObjectId, ref: 'Psychologist' })
  @Prop()
  psychologist: Psychologist;

  // @Prop({ type: Types.ObjectId, ref: 'Patient' })
  @Prop()
  patient: Patient;
}

export const UserSchema = SchemaFactory.createForClass(User);
