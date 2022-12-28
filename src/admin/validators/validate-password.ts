import { length, matches } from "class-validator";

export function validatePassword(password: string): string | undefined {

  if (!length(password, 8, 50)) {
    return 'Must be longer than or equal to 8 and shorter than or equal to 50 characters';
  }

  if (!matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
    return 'Must have at least one Uppercase, Lowercase, Special Character and Number';
  }
  
  return undefined;
}
