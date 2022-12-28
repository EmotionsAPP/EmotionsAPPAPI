import { ActionContext } from "adminjs";
import { plainToClass } from "class-transformer";
import { CreateAdminDto, UpdateAdminDto } from "../dto";
import { validateObject } from "./validate-object";

export const validateAdmin = async (request, context: ActionContext) => {
  let { payload = {}, method } = request;

  if ( method !== 'post' ) return request;

  if (!payload.permissions) {
    let adminPermissions = Object.entries(payload).reduce((permissions, entry) => {
      if (entry[0].includes("permissions")) 
        permissions.push(entry[1]);
  
      return permissions;
    }, []);
  
    payload.permissions = adminPermissions;
  }

  let adminDto;

  if (context.action.name === "new")
    adminDto = plainToClass(CreateAdminDto, payload, { excludeExtraneousValues: true });
  else
    adminDto = plainToClass(UpdateAdminDto, payload, { excludeExtraneousValues: true });

  await validateObject( adminDto );

  request.payload = adminDto;

  return request;
}
