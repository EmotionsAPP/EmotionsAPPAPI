import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsIn, IsOptional } from 'class-validator';
import { MinAge } from '../validators';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
    @IsOptional()
    profileImage?: string;
  
    @IsOptional()
    @IsIn(['male', 'female'])
    gender?: string;
  
    @IsOptional()
    @IsDate()
    @MinAge(18)
    @Type(() => Date)
    birthDate?: Date;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
