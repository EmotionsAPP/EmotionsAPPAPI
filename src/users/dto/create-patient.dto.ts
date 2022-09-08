import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class CreatePatientDto {

}

export class CreatePatientUserDto extends CreateUserDto {
    
    @ValidateNested()
    @Type(() => CreatePatientDto)
    patient: CreatePatientDto;
}

