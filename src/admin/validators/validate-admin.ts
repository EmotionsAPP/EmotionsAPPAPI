import { ActionContext } from "adminjs";
import { plainToClass } from "class-transformer";
import { CreateAdminDto, UpdateAdminDto } from "../dto";
import { validateObject } from "./validate-object";
import { hashPassword } from "../../auth/security";

export const validateAdmin = async (request, context: ActionContext) => {
  const { payload = {}, method } = request;

  if ( method !== 'post' ) return request;

  let adminDto;

  if (context.action.name === "new")
    adminDto = plainToClass(CreateAdminDto, payload);
  else
    adminDto = plainToClass(UpdateAdminDto, payload);
  
  await validateObject( adminDto );

  if (payload.password)
    request.payload.password = await hashPassword(payload.password);

  return request;
}
