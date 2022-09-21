import { IsArray, IsDate, IsInt, IsString, Length, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateUserDto } from './create-user.dto';
import { WorkPlace } from '../interfaces';
import { IsWorkPlaces } from '../validators/is-workplace.validator';

export class CreatePsychologistDto {

  @IsString()
  @Length(11, 11)
  cedula: string;
}

export class CreatePsychologistUserDto extends CreateUserDto {
  
  @ValidateNested()
  @Type(() => CreatePsychologistDto)
  psychologist: CreatePsychologistDto;
}