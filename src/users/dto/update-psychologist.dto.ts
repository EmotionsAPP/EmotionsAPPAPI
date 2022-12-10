import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { CreatePsychologistDto, UpdateUserDto } from '.';

export class UpdatePsychologistDto extends PartialType(CreatePsychologistDto) {

    @IsOptional()
    @Length(1, 50)
    title?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    firstWorkDate?: Date;

    @IsOptional()
    @Length(1, 255)
    about?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    goals?: string[];

    @IsOptional()
    workPlaces?: any[];
}

export class UpdatePsychologistUserDto extends UpdateUserDto {

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdatePsychologistDto)
    psychologist?: UpdatePsychologistDto;
}