import useValidation from './useValidation';

const validObject = {
  inValidAt: -1,
  isValid: true,
  message: '',
};

describe('useValidation', () => {
  it('should accept function', () => {});

  it('should accept object', () => {});

  it('should accept array of function', () => {});

  it('should accept array of object', () => {});

  it('should pass validation', () => {
    expect(useValidation(1, { validateFn: (v) => v > 0 })).toEqual(validObject);
    expect(useValidation(1, { validateFn: (v) => v > 0 })).toEqual(validObject);
  });
});
