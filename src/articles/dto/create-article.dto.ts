import { IsMongoId, IsString, Length } from "class-validator";

export class CreateArticleDto {

    @Length(1, 50)
    title: string;

    @IsString()
    body: string;

    @IsMongoId()
    psychologist: string;
}
