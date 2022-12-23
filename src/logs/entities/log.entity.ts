import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Log extends Document {

  @Prop()
  recordId: string;

  @Prop()
  recordTitle: string;

  @Prop({ type: 'Object' })
  difference: any;
  
  @Prop({ default: 'Master Administrator' })
  userId: string;
  
  @Prop()
  action: string;

  @Prop()
  resource: string;
}

export const LogSchema = SchemaFactory.createForClass( Log );
