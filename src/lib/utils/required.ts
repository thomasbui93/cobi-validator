import { ValidationFunction } from '../../types/ValidationFunction'
import { isNull } from 'util'

export const requiredName = 'requiredName'

export const requiredFunction: ValidationFunction = ([value, ...params]) => {
  if (
    typeof value === 'undefined' ||
    isNull(value) ||
    isNaN(value) ||
    value.length === 0
  ) {
    return false
  }
  return true
}
