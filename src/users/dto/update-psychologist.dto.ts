import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional, Length, ValidateNested } from 'class-validator';
import { CreatePsychologistDto, UpdateUserDto } from '.';
import { Goal, WorkPlace } from '../interfaces';

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
    @Type(() => Goal)
    @ValidateNested()
    goals?: Goal[];

    @IsOptional()
    @IsArray()
    @Type(() => WorkPlace)
    @ValidateNested()
    workPlaces?: WorkPlace[];
}

export class UpdatePsychologistUserDto extends UpdateUserDto {

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdatePsychologistDto)
    psychologist?: UpdatePsychologistDto;
}