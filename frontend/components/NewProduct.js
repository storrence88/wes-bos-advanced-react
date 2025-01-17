import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { ALL_PRODUCTS_QUERY } from './Products';
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      description
      price
      status
    }
  }
`;

const NewProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: 'Steve',
    price: 123,
    description: 'Something'
  });

  const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await createProduct();
    clearForm();
    Router.push({ pathname: `/product/${res.data.createProduct.id}` });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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

export default NewProduct;
