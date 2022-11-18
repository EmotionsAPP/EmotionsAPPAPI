import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../users/entities";

@Schema({ timestamps: true })
export class Note extends Document {

    @Prop()
    note: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    psychologist: User;

    @Prop({ type: Types.ObjectId, ref: User.name })
    patient: User;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
