import { ActionContext } from "adminjs";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreatePatientUserDto, CreatePsychologistUserDto, UpdatePatientUserDto, UpdatePsychologistUserDto } from "../../users/dto";

export const validateUser = async (request, context: ActionContext) => {
  const { payload = {}, method } = request;

  if ( method !== 'post' ) return request;

  if (payload.role === "Patient") await validatePatient(payload, context);
  else await validatePsychologist(payload, context);

  return request;
}

const validatePsychologist = async (payload: any, context: ActionContext) => {
  
  let dto;

  if (context.action.name === "new")
    dto = plainToClass(CreatePsychologistUserDto, payload);
  else
    dto = plainToClass(UpdatePsychologistUserDto, payload);

  await validate(dto);
}

const validatePatient = async (payload: any, context: ActionContext) => {

  let dto;

  if (context.action.name === "new") {
    dto = plainToClass(CreatePatientUserDto, payload);
    dto.patient = {};
  }
  else
    dto = plainToClass(UpdatePatientUserDto, payload);

  await validate(dto);
}
