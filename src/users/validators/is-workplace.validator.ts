import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { WorkPlace } from '../interfaces';

@ValidatorConstraint()
export class IsWorkPlacesConstraint implements ValidatorConstraintInterface {
  validate(
    workPlaces: WorkPlace[],
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    if (!workPlaces) return false;

    for (const workPlace of workPlaces) {
      if (
        !workPlace.place ||
        !workPlace.daysRange ||
        !workPlace.startTime ||
        !workPlace.endTime
      )
        return false;
    }

    // for (const values of Object.values(workPlace))
    //   if ((values as string).length < 1) return false;

    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `place, daysRange, startTime and endTime should be defined as strings`;
  }
}

export function IsWorkPlaces(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isWorkPlaceArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsWorkPlacesConstraint,
    });
  };
}
