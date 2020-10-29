type ValidateFn<T> = (value: T) => boolean;

interface Validator<T> {
  validateFn: ValidateFn<T>
  errMsg?: string
}

interface Result {
  isValid: boolean
  inValidAt: number
  errMsg: string
}

type Validation<T> = ValidateFn<T> | Validator<T> | Array<ValidateFn<T>> | Array<Validator<T>>

function useValidation<T>(value: T, validateFn: ValidateFn<T>): Result;
function useValidation<T>(value: T, validator: Validator<T>): Result;
function useValidation<T>(value: T, validateFn: Array<ValidateFn<T>>): Result;
function useValidation<T>(value: T, validateFn: Array<Validator<T>>): Result;

function useValidation<T>(value: T, validation: Validation<T>): Result {
  let isValid = true;
  let inValidAt = -1;
  let errMsg = '';

  if (typeof validation === 'function') {
    isValid = validation(value);
    if (!isValid) {
      inValidAt = 0;
    }
  } else if ('validateFn' in validation) {
    isValid = validation.validateFn(value);
    if (!isValid) {
      inValidAt = 0;
      errMsg = validation.errMsg || '';
    }
  } else if (Array.isArray(validation)) {
    for (let i = 0; i < validation.length; i += 1) {
      const currentValidation = validation[i];
      if (typeof currentValidation === 'function') {
        isValid = currentValidation(value);
        if (!isValid) {
          inValidAt = i;
          errMsg = '';
          break;
        }
      } else if ('validateFn' in currentValidation) {
        isValid = currentValidation.validateFn(value);
        if (!isValid) {
          inValidAt = i;
          errMsg = currentValidation.errMsg || '';
          break;
        }
      }
    }
  }

  return {
    isValid,
    inValidAt,
    errMsg,
  };
}

export default useValidation;
