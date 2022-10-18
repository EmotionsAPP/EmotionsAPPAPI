import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { AppointmentStatus } from "../interfaces";

export class AppointmentsPaginationDto {

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    offset?: number;

    @IsString()
    userId: string;

    @IsOptional()
    @IsEnum( AppointmentStatus )
    status?: AppointmentStatus;
}
