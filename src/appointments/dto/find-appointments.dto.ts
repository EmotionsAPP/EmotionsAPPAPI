import { Type } from "class-transformer";
import { IsDate, IsEnum, IsMongoId, IsOptional } from "class-validator";
import { ExcludeAppointmentStatus } from "../interfaces";

export class FindAppointmentsDto {

    @IsMongoId()
    userId: string;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsOptional()
    @IsEnum( ExcludeAppointmentStatus )
    excludeStatus?: ExcludeAppointmentStatus;
}

