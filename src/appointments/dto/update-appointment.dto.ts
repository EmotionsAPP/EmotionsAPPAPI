import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    started?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    completed?: Date;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
