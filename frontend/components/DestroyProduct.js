import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  console.log(payload);
  console.log('Running the update function after delete');
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DestroyProduct = ({ id, children }) => {
  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id: id },
    update: update
  });

  return (
    <button
      disabled={loading}
      type='button'
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          // Go ahead and delete item
          console.log('Deleting item...');
          deleteProduct().catch((error) => alert(error.message));
        } else {
          // Don't delete item
          console.log('Cancelling delete...');
        }
      }}
    >
      {children}
    </button>
  );
};

export default DestroyProduct;
