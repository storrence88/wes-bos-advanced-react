import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { SINGLE_ITEM_QUERY } from './SingleProduct';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION($id: ID!, $name: String, $description: String, $price: Int) {
    updateProduct(id: $id, data: { name: $name, description: $description, price: $price }) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  // 1. Get existing product
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, { variables: { id: id } });

  // 2. Create mutation to update the product
  const [
    updateProduct,
    { loading: updateLoading, error: updateError, data: updateData }
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  // 2.5. Create some state for the form inputs
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  // 3.0 Create handleSubmit method
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProduct({
      variables: {
        id: id,
        name: inputs.name,
        price: inputs.price,
        description: inputs.description
      }
    }).catch(console.error);
    // Router.push({ pathname: `/products/${res.data.createProduct.id}` });
  };

  // 3.5 Create form for handling the update
  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
        <button type='submit'>Update Product</button>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;
