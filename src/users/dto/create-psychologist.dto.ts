import { IsArray, IsDate, IsInt, IsString, Length, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateUserDto } from './create-user.dto';
import { WorkPlace } from '../interfaces';
import { IsWorkPlaces } from '../validators/is-workplace.validator';

export class CreatePsychologistDto {

  @Length(7, 7)
  codopsi: string;
}

export class CreatePsychologistUserDto extends CreateUserDto {
  
  @ValidateNested()
  @Type(() => CreatePsychologistDto)
  psychologist: CreatePsychologistDto;
}