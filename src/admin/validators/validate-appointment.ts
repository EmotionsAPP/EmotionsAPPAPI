import { ActionContext } from "adminjs";
import { plainToClass } from "class-transformer";
import { CreateAppointmentDto, UpdateAppointmentDto } from "../../appointments/dto";
import { validateObject } from "./validate-object";

export const validateAppointment = async (request, context: ActionContext) => {
  const { payload = {}, method } = request;

  if ( method !== 'post' ) return request;

  if (context.action.name === "new") {
    const createAppointmentDto = plainToClass(CreateAppointmentDto, payload);
    await validateObject( createAppointmentDto );
  }
  else {
    const updateAppointmentDto = plainToClass(UpdateAppointmentDto, payload);
    await validateObject( updateAppointmentDto );
  }

  return request;
}
