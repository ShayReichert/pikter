import { useState, useEffect } from "react";

const useForm = (initialState, validate, next) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const isErrors = Object.keys(errors).length !== 0;
      if (isErrors) {
        setIsSubmitting(false);
      } else {
        next();
        setIsSubmitting(false);
        setValues(initialState);
      }
    }
  }, [errors, next, isSubmitting, initialState]);

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      next();
    } else if (event.keyCode === 13 && event.metaKey) {
      next();
    }
  };

  const handleChange = (event) => {
    event.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate(values);
    setErrors(errors);
    setIsSubmitting(true);
  };

  return {
    handleSubmit,
    handleKeyPress,
    handleChange,
    values,
    errors,
  };
};

export default useForm;
