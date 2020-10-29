import useValidation from './useValidation';

const validObject = {
  isValid: true,
  inValidAt: -1,
  errMsg: '',
};

describe('useValidation', () => {
  it('should accept function', () => {
    expect(useValidation(1, (v: number) => v > 0)).toEqual(validObject);
    expect(useValidation(1, (v: number) => v > 2)).toEqual({
      isValid: false,
      inValidAt: 0,
      errMsg: '',
    });
  });

  it('should accept object', () => {
    expect(useValidation(1, { validateFn: (v: number) => v > 0 })).toEqual(validObject);
    expect(useValidation(1, { validateFn: (v: number) => v > 2, errMsg: 'abc123' })).toEqual({
      isValid: false,
      inValidAt: 0,
      errMsg: 'abc123',
    });
  });

  it('should accept array of function', () => {
    expect(useValidation(3, [
      (v: number) => v > 0,
      (v: number) => v > 2,
      (v: number) => v > 4]))
      .toEqual({
        isValid: false,
        inValidAt: 2,
        errMsg: '',
      });
  });

  it('should accept array of object', () => {});

  it('should pass validation', () => {
    expect(useValidation(1, { validateFn: (v: number) => v > 0 })).toEqual(validObject);
    expect(useValidation(1, { validateFn: (v: number) => v > 0 })).toEqual(validObject);
  });
});
