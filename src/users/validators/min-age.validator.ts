import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class MinAgeConstraint implements ValidatorConstraintInterface {
  validate(
    date: Date,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const minAge = validationArguments.constraints[0];

    const now = new Date(Date.now());
    const age = now.getUTCFullYear() - date.getUTCFullYear();

    return age >= minAge;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Should be older than ${validationArguments.constraints[0]}`;
  }
}

export function MinAge(age: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'minAge',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [age],
      options: validationOptions,
      validator: MinAgeConstraint,
    });
  };
}
