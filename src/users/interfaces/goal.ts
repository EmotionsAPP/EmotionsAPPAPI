import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class Goal {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  title: string;
}
