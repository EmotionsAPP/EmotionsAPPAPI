import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Patient extends Document {
  @Prop()
  information: string;

  @Prop()
  diagnostic: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
