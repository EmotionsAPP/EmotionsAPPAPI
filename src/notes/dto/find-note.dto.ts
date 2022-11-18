import { IsMongoId } from "class-validator";

export class FindNoteDto {

    @IsMongoId()
    psychologist: string;

    @IsMongoId()
    patient: string;
}
