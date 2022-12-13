import { ValidationError } from "adminjs";
import { validate } from "class-validator";
import { getPropertyErrors } from "../helpers";

export const validateObject = async (object: Object) => {
  
  const errors = await validate( object );

  if (!Object.keys( errors ).length) return;

  const propertyErrors = getPropertyErrors( errors );
  throw new ValidationError( propertyErrors );
}
