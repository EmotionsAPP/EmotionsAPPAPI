import { PropertyErrors } from "adminjs";
import { ValidationError } from "class-validator";

export const getPropertyErrors = (validationErrors: ValidationError[]): PropertyErrors => {
  let errors = {};

  validationErrors.forEach(validationError => {
    errors[validationError.property] = {
      message: Object.values(validationError.constraints).join('\n')
    }
  });

  return errors;
}
