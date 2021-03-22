import { useEffect, useState } from 'react';

const useForm = (initial = {}) => {
  // Create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  const handleChange = (event) => {
    let { name, value, type } = event.target;

    if (type === 'number') value = parseInt(value);
    if (type === 'file') [value] = event.target.files;

    setInputs({ ...inputs, [name]: value });
  };

  const resetForm = () => setInputs(initial);

  const clearForm = () => {
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, '']));
    setInputs(blankState);
  };

  return { inputs, handleChange, resetForm, clearForm };
};

export default useForm;
