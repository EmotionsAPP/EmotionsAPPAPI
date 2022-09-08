import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreatePatientUserDto } from './create-patient.dto';

export class UpdatePatientDto {

    @IsOptional()
    @IsString()
    information?: string;

    @IsOptional()
    @IsString()
    diagnostic?: string;
}

export class UpdatePatientUserDto extends PartialType(CreatePatientUserDto) {
    
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdatePatientDto)
    patient?: UpdatePatientDto;
}