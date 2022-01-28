import { useState } from "react";

const useInput = (validateValue) => {
  const [inputState, setInputState] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setInputState(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setInputState("");
    setIsTouched(false);
  };

  return {
    value: inputState,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
