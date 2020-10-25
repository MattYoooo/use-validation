const useValidation = (value, validation) => {
  console.log(validation.validateFn(value));
  return {
    isValid: true,
    inValidAt: -1,
    message: '',
  };
};

export default useValidation;
