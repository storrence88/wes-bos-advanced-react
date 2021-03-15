import { useState } from 'react';

const useForm = (initial = {}) => {
  // Create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  const handleChange = (event) => {
    let { name, value, type } = event.target;

    if (type === 'number') value = parseInt(value);
    if (type === 'file') value[0] = e.target.files;

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
