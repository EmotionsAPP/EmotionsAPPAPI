import { ActionContext } from "adminjs";
import { plainToClass } from "class-transformer";
import { AdminDto } from "../dto";
import { validateObject } from "./validate-object";

export const validateAdmin = async (request, context: ActionContext) => {
  const { payload = {}, method } = request;

  if ( method !== 'post' ) return request;

  const adminDto = plainToClass(AdminDto, payload);
  await validateObject( adminDto );

  return request;
}
