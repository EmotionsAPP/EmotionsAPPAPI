import { IsBoolean, IsEmail, IsOptional, IsString, Length, Matches, MaxLength } from "class-validator";

export class AdminDto {
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsString()
  @Length(8, 50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'The Password must have at least one Uppercase, Lowercase, Special Character and Number',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  lastName?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
