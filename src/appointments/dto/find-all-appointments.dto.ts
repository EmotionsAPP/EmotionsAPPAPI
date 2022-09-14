import { Type } from "class-transformer";
import { IsDate, IsMongoId } from "class-validator";

export class FindAllAppointmentsDto {

    @IsMongoId()
    userId: string;

    @IsDate()
    @Type(() => Date)
    date: Date;
}

