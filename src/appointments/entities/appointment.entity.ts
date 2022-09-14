import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document, Types } from "mongoose";

import { User } from "../../users/entities";
import { AppointmentStatus } from "../interfaces";

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

    @Prop({ default: AppointmentStatus.Scheduled })
    status: AppointmentStatus;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: Types.ObjectId, ref: User.name })
    psychologist: User;

    @Prop({ type: Types.ObjectId, ref: User.name })
    patient: User;
}

export const AppointmentSchema = SchemaFactory.createForClass( Appointment );
