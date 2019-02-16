import { ValidationFunction } from '../types/ValidationFunction'
import { requiredName, requiredFunction } from './utils/required'
import { requiredDynamic, requiredDynamicFunc } from './utils/dynamic'

/**
 * Validator Hub Singleton
 */
export class ValidatorHub {
  private static instance: ValidatorHub
  private validations: Map<string, ValidationFunction> = new Map([
    [requiredName, requiredFunction],
    [requiredDynamic, requiredDynamicFunc]
  ])

  private constructor() {}

  public static getValidator() {
    if (!ValidatorHub.instance) {
      ValidatorHub.instance = new ValidatorHub()
    }
    return ValidatorHub.instance
  }

  public addValidation(
    validationName: string,
    validateFunc: ValidationFunction
  ): void {
    if (this.validations.has(validationName)) {
      throw Error('Schema is already existed!')
    } else {
      this.validations.set(validationName, validateFunc)
    }
  }

  public hasValidation(validationName: string): boolean {
    return this.validations.has(validationName)
  }

  public getValidation(validationName: string): ValidationFunction | undefined {
    return this.validations.get(validationName)
  }
}
