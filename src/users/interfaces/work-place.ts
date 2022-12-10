import { IsString } from "class-validator";

export class WorkPlace {
  @IsString()
  name: string;

  @IsString()
  schedule: string;
}
