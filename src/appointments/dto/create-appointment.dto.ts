import { Type } from "class-transformer";
import { IsDate, IsEnum, IsMongoId, IsOptional, IsString } from "class-validator";
import { AppointmentStatus } from "../interfaces";

export class CreateAppointmentDto {

    @IsString()
    description: string;

    @IsDate()
    @Type(() => Date)
    start: Date;

    @IsDate()
    @Type(() => Date)
    end: Date;

    @IsOptional()
    @IsEnum( AppointmentStatus )
    status?: AppointmentStatus;

    @IsMongoId()
    psychologist: string;

    @IsMongoId()
    patient: string;
}
