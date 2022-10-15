import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class GetHistoryAppointmentsDto {

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
}
