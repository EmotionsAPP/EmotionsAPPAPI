import { Type } from "class-transformer";
import { IsDate, IsMongoId, IsString } from "class-validator";

export class CreateAppointmentDto {

    @IsString()
    description: string;

    @IsDate()
    @Type(() => Date)
    start: Date;

    @IsDate()
    @Type(() => Date)
    end: Date;

    @IsMongoId()
    psychologist: string;

    @IsMongoId()
    patient: string;
}
