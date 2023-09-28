import { useState, useCallback } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const errorAlreadyExists = errors.some((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [...prevState, { field, message }]);
  }, [errors]);

  const unsetError = useCallback((fieldName) => {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }, []);

  const getErrorMessageByFieldName = useCallback((fieldName) => {
    const error = errors.find((err) => err.field === fieldName);
    return error?.message;
  }, [errors]);

  return {
    errors,
    setError,
    unsetError,
    getErrorMessageByFieldName,
  };
}
