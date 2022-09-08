import { IsArray, IsDate, IsInt, IsString, Length, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateUserDto } from './create-user.dto';
import { WorkPlace } from '../interfaces';
import { IsWorkPlaces } from '../validators/is-workplace.validator';

export class CreatePsychologistDto {
  @Length(7, 7)
  codopsi: string;

  // @Length(1, 50)
  // title: string;

  // @IsDate()
  // @Type(() => Date)
  // firstWorkDate: Date;

  // @Length(1, 255)
  // about: string;

  // @IsArray()
  // @IsString({ each: true })
  // goals: string[];

  // @IsWorkPlaces()
  // workPlaces: WorkPlace[];
}

export class CreatePsychologistUserDto extends CreateUserDto {
  @ValidateNested()
  @Type(() => CreatePsychologistDto)
  psychologist: CreatePsychologistDto;
}