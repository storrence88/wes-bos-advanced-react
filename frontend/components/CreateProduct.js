import useForm from '../lib/useForm';

const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'Steve',
    price: 123,
    description: 'Something'
  });

  return (
    <form>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        name='name'
        id='name'
        placeholder='Name'
        value={inputs.name}
        onChange={handleChange}
      />
      <label htmlFor='price'>Price</label>
      <input
        type='number'
        name='price'
        id='price'
        placeholder='Price'
        value={inputs.price}
        onChange={handleChange}
      />
      <label htmlFor='description'>Description</label>
      <input
        type='text'
        name='description'
        id='description'
        placeholder='Description'
        value={inputs.description}
        onChange={handleChange}
      />
      <button type='button' onClick={clearForm}>
        Clear Form
      </button>
      <button type='button' onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
};

export default CreateProduct;
