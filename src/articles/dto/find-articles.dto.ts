import { IsMongoId, IsOptional } from "class-validator";

export class FindArticlesDto {

  @IsOptional()
  @IsMongoId()
  psychologistId?: string;
}
