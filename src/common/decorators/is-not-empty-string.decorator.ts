import { ValidationOptions, ValidationArguments,registerDecorator, isString, isNotEmpty } from 'class-validator'; 

export function IsNotEmptyString(validationOptions?: ValidationOptions): PropertyDecorator {
    return (object: unknown, propertyName: string) => {
      registerDecorator({
        name: 'IsNotEmptyString',
        target: object.constructor,
        propertyName,
        options: validationOptions,
        validator: {
          validate: (value: any): boolean => {
            return isString(value) && isNotEmpty(value.trim())
          },
          defaultMessage: (validationArguments?: ValidationArguments): string => `${validationArguments.property} should not be an empty string`
        }
      })
    }
  }