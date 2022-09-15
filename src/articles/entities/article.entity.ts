import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../users/entities";

@Schema({ timestamps: true })
export class Article extends Document {

    @Prop()
    title: string;

    @Prop()
    body: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: Types.ObjectId, ref: User.name })
    psychologist: User;
}

export const ArticleSchema = SchemaFactory.createForClass( Article );
