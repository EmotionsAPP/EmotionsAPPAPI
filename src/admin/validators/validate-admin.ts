import { ActionContext } from "adminjs";
import { plainToClass } from "class-transformer";
import { CreateAdminDto, UpdateAdminDto } from "../dto";
import { validateObject } from "./validate-object";
import { hashPassword } from "../../auth/security";

export const validateAdmin = async (request, context: ActionContext) => {
  let { payload = {}, method } = request;

  if ( method !== 'post' ) return request;

  let adminDto;

  if (!payload.permissions) {
    let adminPermissions = Object.entries(payload).reduce((permissions, entry) => {
      if (entry[0].includes("permissions")) 
        permissions.push(entry[1]);
  
      return permissions;
    }, []);
  
    payload.permissions = adminPermissions;
  }

  console.log({payload});

  if (context.action.name === "new")
    adminDto = plainToClass(CreateAdminDto, payload, { excludeExtraneousValues: true });
  else
    adminDto = plainToClass(UpdateAdminDto, payload, { excludeExtraneousValues: true });
  
  console.log({adminDto});

  await validateObject( adminDto );

  request.payload = adminDto;

  // if (payload.password)
  //   request.payload.password = await hashPassword(payload.password);

  return request;
}
