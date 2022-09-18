import { Type } from "class-transformer";
import { IsDate, IsMongoId } from "class-validator";

export class FindAppointmentsDto {

    @IsMongoId()
    userId: string;

    @IsDate()
    @Type(() => Date)
    date: Date;
}

