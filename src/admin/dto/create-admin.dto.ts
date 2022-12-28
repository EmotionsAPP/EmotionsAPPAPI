import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Length, Matches, MaxLength, ValidateNested } from "class-validator";

export class CreateAdminDto {

  @Expose()
  _id?: string;

  @IsEmail()
  @MaxLength(100)
  @Expose()
  email: string;

  // @IsString()
  // @Length(8, 50)
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  //   message:
  //     'The Password must have at least one Uppercase, Lowercase, Special Character and Number',
  // })
  @Expose()
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  @Expose()
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  @Expose()
  lastName?: string;

  @IsOptional()
  @IsBoolean()
  @Expose()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  isSuperAdmin?: boolean;

  // @ValidateNested()
  @IsString({ each: true })
  @Expose()
  // @Type(() => PermissionDto)
  permissions?: string[];
}
