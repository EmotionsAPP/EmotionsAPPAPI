import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { MinAge } from '../validators';
import { CreatePsychologistDto } from './create-psychologist.dto';

export class CreateUserDto {
  @IsString()
  @Length(11, 11)
  taxId: string;

  @IsString()
  @Length(1, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @Length(8, 50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The Password must have at least an Uppercase, Lowercase and a Number',
  })
  password: string;

  // @IsString()
  // @IsIn(['male', 'female'])
  // gender: string;

  // @IsDate()
  // @MinAge(18)
  // @Type(() => Date)
  // birthDate: Date;
}
