import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;
}

export const AdminSchema = SchemaFactory.createForClass( Admin );