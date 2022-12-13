import { ActionContext } from "adminjs";
import { AdminDto } from "../dto";
import { validateObject } from "./validate-object";

export const validateAdmin = async (request, context: ActionContext) => {
  const { payload = {}, method } = request;

  if ( method !== 'post' ) return request;

  const adminDto = new AdminDto();
  adminDto.email = payload.email;
  await validateObject( adminDto );

  return request;
}
