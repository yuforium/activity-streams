import { ValidateIf, ValidationOptions } from "class-validator";
import { isRequiredMetadataKey } from "./is-required";

export const IS_OPTIONAL = 'activityStreamsIsRequired';

export function IsOptional(validationOptions?: ValidationOptions) {
  return function IsOptionalDecorator(prototype: Object, propertyKey: string | symbol) {
    ValidateIf((obj) => {
      if (Reflect.getMetadata(isRequiredMetadataKey, obj, propertyKey)) {
        return true;
      }
      return obj[propertyKey] !== null && obj[propertyKey] !== undefined;
    }, validationOptions)(prototype, propertyKey);
  }
}
/**
 * Checks if value is missing and if so, ignores all validators.
 */
// export function OldIsOptional(validationOptions?: ValidationOptions) {
//   return function(object: Object, propertyName: string) {
//     console.log('isoptional on ' + propertyName);
//     if (propertyName === 'content') {
//       console.log('content is optional');
//     }
//     const args: ValidationMetadataArgs = {
//       type: ValidationTypes.CONDITIONAL_VALIDATION,
//       target: object.constructor,
//       propertyName,
//       constraints: [
//         (object: any, value: any): boolean => {
//           console.log('checking constraints');
//           // does this property exist?
//           if (Reflect.getMetadata(isRequiredMetadataKey, object, propertyName)) {
//             return true;
//           }
//           return object[propertyName] !== null && object[propertyName] !== undefined;
//         }
//       ],
//       validationOptions
//     };
//     getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
//   }
// }