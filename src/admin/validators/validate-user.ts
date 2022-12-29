import { ActionContext } from "adminjs";
import { plainToClass } from "class-transformer";
import {
  CreatePatientUserDto,
  CreatePsychologistUserDto,
  UpdatePatientUserDto,
  UpdatePsychologistUserDto
} from "../../users/dto";

export const validateUser = async (request, context: ActionContext) => {
  const { payload = {}, method } = request;

  if ( method !== 'post' ) return request;

  let userDto;

  if (payload.role === "Patient") userDto = await buildPatientDto(payload, context);
  else userDto = await buildPsychologistDto(payload, context);

  return request;
}

const buildPsychologistDto = async (payload: any, context: ActionContext) => {

  return (context.action.name === "new") 
    ? plainToClass(CreatePsychologistUserDto, payload)
    : plainToClass(UpdatePsychologistUserDto, payload);
}

const buildPatientDto = async (payload: any, context: ActionContext) => {

  let dto;

  if (context.action.name === "new") {
    dto = plainToClass(CreatePatientUserDto, payload);
    dto.patient = {};
  }
  else
    dto = plainToClass(UpdatePatientUserDto, payload);

  return dto;
}
