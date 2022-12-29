import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { ValidRoles } from '../../auth/interfaces';

export class CreateUserDto {

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
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'The Password must have at least one Uppercase, Lowercase, Special Character and Number',
  })
  password: string;

  @IsOptional()
  @IsEnum(ValidRoles)
  role?: ValidRoles;
}
