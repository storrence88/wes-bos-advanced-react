import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart, { loading, error, data }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id: id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  return (
    <button type='button' onClick={addToCart} disabled={loading}>
      Add{loading && 'ing'} to Cart 🛒
    </button>
  );
};

export default AddToCart;
