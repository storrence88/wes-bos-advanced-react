import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_ITEM_FROM_CART = gql`
  mutation REMOVE_ITEM_FROM_CART($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const RemoveFromCart = ({ id }) => {
  const [removeItemFromCart, { loading, error, data }] = useMutation(REMOVE_ITEM_FROM_CART, {
    variables: { id: id }
  });

  return (
    <BigButton
      disable={loading}
      type='button'
      title='Remove this item from your cart'
      onClick={removeItemFromCart}
    >
      &times;
    </BigButton>
  );
};

export default RemoveFromCart;
