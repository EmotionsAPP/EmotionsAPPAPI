import { ActionContext } from "adminjs";

export const validatePermissions = (actionContext: ActionContext): boolean => {
  const { action, currentAdmin, resource } = actionContext;

  if (currentAdmin.isSuperAdmin) 
    return true;

  if (!currentAdmin.permissions)
    return false;

  const actionName = (action.name === "bulkDelete") ? "delete" : action.name;

  const permission = `${resource.id()}|${actionName}`;

  const isAccessible = (currentAdmin.permissions as string[]).includes(permission);

  return isAccessible;
}
