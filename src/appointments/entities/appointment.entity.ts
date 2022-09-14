import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../users/entities";

@Schema({ timestamps: true })
export class Appointment extends Document {
    
    @Prop()
    description: string;

    @Prop()
    start: Date;

    @Prop()
    end: Date;

    @Prop()
    started: Date;

    @Prop()
    completed: Date;

    @Prop({ type: Types.ObjectId, ref: User.name })
    psychologist: User;

    @Prop({ type: Types.ObjectId, ref: User.name })
    patient: User;
}

export const AppointmentSchema = SchemaFactory.createForClass( Appointment );
