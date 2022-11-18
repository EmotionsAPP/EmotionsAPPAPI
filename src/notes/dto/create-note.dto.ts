import { IsMongoId, IsString } from "class-validator";

export class CreateNoteDto {

    @IsString()
    note: string;

    @IsMongoId()
    psychologist: string;

    @IsMongoId()
    patient: string;
}
