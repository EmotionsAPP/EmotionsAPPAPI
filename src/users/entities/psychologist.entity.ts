import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Goal, WorkPlace } from '../interfaces';

@Schema()
export class Psychologist extends Document {
  @Prop({ index: true })
  idCardNo: string;

  @Prop({ default: false })
  emergencyAvailable?: boolean;

  @Prop()
  title?: string;

  @Prop()
  firstWorkDate?: Date;

  @Prop()
  about?: string;

  @Prop()
  goals?: Goal[];

  @Prop()
  workPlaces?: WorkPlace[];

  @Prop()
  connectionId?: string;
}

export const PsychologistSchema = SchemaFactory.createForClass(Psychologist);
