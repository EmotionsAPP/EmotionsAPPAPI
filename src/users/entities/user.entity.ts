import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidRoles } from '../../auth/interfaces';
import { Patient, Psychologist } from '.';

@Schema({ timestamps: true })
export class User extends Document {

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  profileImage?: string;

  @Prop()
  gender?: string;

  @Prop()
  birthDate?: Date;

  @Prop()
  role: ValidRoles;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  psychologist?: Psychologist;

  @Prop()
  patient?: Patient;
}

export const UserSchema = SchemaFactory.createForClass(User);
