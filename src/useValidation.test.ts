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

  it('should accept an array of functions', () => {
    expect(useValidation(3, [
      (v: number) => v > 0,
      (v: number) => v > 2,
      (v: number) => v > 4]))
      .toEqual({
        isValid: false,
        inValidAt: 2,
        errMsg: '',
      });
    expect(useValidation(7, [
      (v: number) => v > 0,
      (v: number) => v > 2,
      (v: number) => v > 4]))
      .toEqual(validObject);
  });

  it('should accept an array of objects', () => {
    expect(useValidation(3, [
      { validateFn: (v: number) => v > 0 },
      { validateFn: (v: number) => v > 2 },
      { validateFn: (v: number) => v > 4 }]))
      .toEqual({
        isValid: false,
        inValidAt: 2,
        errMsg: '',
      });

    expect(useValidation(3, [
      { validateFn: (v: number) => v > 0, errMsg: 'Not larger than 0' },
      { validateFn: (v: number) => v > 2, errMsg: 'Not larger than 2' },
      { validateFn: (v: number) => v > 4, errMsg: 'Not larger than 4' }]))
      .toEqual({
        isValid: false,
        inValidAt: 2,
        errMsg: 'Not larger than 4',
      });
  });

  it('should pass validation', () => {
    expect(useValidation(1, { validateFn: (v: number) => v > 0 })).toEqual(validObject);
  });
});
