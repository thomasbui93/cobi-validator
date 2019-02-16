import 'reflect-metadata'
import { ValidatorHub } from './ValidatorHub'

const validatorHub = ValidatorHub.getValidator()

/**
 *
 * @param validationName validation name
 * @param additionalParams additional defining value to the validator
 */
export const PropertyValidator = (
  validationName: string,
  ...additionalParams: any[]
) => {
  let scopedValue: any
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: () => {
        return scopedValue
      },
      set: newValue => {
        let isValid = true
        if (validatorHub.hasValidation(validationName)) {
          const validator = validatorHub.getValidation(validationName)
          if (validator) {
            isValid = validator([newValue, ...additionalParams])
          }
        }
        if (!isValid) {
          throw Error(
            `Invalid value: {${newValue}} for this field: ${propertyKey.toString()}`
          )
        }
        scopedValue = newValue
      }
    })
  }
}
