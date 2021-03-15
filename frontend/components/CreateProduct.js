import useForm from '../lib/useForm';
import Form from '../components/styles/Form';

const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: 'Steve',
    price: 123,
    description: 'Something'
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor='image'>
          Image
          <input required type='file' name='image' id='image' onChange={handleChange} />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            name='price'
            id='price'
            placeholder='Price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            name='description'
            id='description'
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type='submit'>+ Add Product</button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
