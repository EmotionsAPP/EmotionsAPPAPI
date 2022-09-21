import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WorkPlace } from '../interfaces';

@Schema()
export class Psychologist extends Document {
  @Prop({ unique: true, index: true })
  cedula: string;

  @Prop()
  title?: string;

  @Prop()
  firstWorkDate?: Date;

  @Prop()
  about?: string;

  @Prop()
  goals?: string[];

  @Prop()
  workPlaces?: WorkPlace[];
}

export const PsychologistSchema = SchemaFactory.createForClass(Psychologist);
