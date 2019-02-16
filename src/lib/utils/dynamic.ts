import { ValidationFunction } from '../../types/ValidationFunction'
import { requiredFunction } from './required'
import { isNumber, isBoolean } from 'util'

export const requiredDynamic = 'dynamic'

export const requiredDynamicFunc: ValidationFunction = ([
  value,
  staticType,
  ...params
]) => {
  if (requiredFunction(value)) {
    switch (staticType) {
      case 'string':
        return typeof value === 'string' && value.trim().length > 0
      case 'number':
        return isNumber(value)
      case 'boolean':
        return isBoolean(value)
      case 'date':
        return value instanceof Date && !isNaN(value.getTime())
      default:
        return true
    }
  }
  return true
}
