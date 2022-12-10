import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdateUserDto } from '.';

export class UpdatePatientDto {

    @IsOptional()
    @IsString()
    information?: string;

    @IsOptional()
    @IsString()
    diagnostic?: string;
}

export class UpdatePatientUserDto extends UpdateUserDto {
    
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdatePatientDto)
    patient?: UpdatePatientDto;
}