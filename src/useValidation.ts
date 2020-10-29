type ValidateFn<T> = (value: T) => boolean;

interface Validator<T> {
  validateFn: ValidateFn<T>
  errMsg?: string
}

function useValidation<T>(value: T, validateFn: ValidateFn<T>): any;
function useValidation<T>(value: T, validator: Validator<T>): any;
function useValidation<T>(value: T, validateFn: Array<ValidateFn<T>>): any;
function useValidation<T>(value: T, validateFn: Array<Validator<T>>): any;

function useValidation<T>(value: T, validation: any) {
  let isValid;
  let inValidAt = -1;
  let errMsg = '';
  let validateFn = validation;

  if ('validateFn' in validation) {
    validateFn = validation.validateFn;
  }
  if (typeof validateFn === 'function') {
    isValid = validateFn(value);
    if (!isValid) {
      inValidAt = 0;
    }
    if (!isValid && validation.errMsg) {
      errMsg = validation.errMsg;
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
