import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import SickButton from './styles/SickButton';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';
import { useRouter } from 'next/router';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: graphqlError }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  const handleSubmit = async (event) => {
    // 1. Stop the form from submitting and turn on loading state
    event.preventDefault();
    setLoading(true);
    console.log('We gotta do some work...');

    // 2. Start the page transition
    nProgress.start();

    // 3. Create the payment method via Stripe (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
    console.log(paymentMethod);

    // 4. Handle any errors from Stripe
    if (error) {
      setError(error);
      nprogress.done();
      return; // Stops the checkout from happening
    }

    // 5. Send the token from step 3 to our Keystone.js server via a custom mutation!
    const order = await checkout({
      variables: {
        token: paymentMethod.id
      }
    });
    console.log('Finished with the order!');
    console.log(order);

    // 6. Change the page to view the order
    router.push({
      pathname: '/order/[id]',
      query: { id: order.data.checkout.id }
    });

    // 7. Close the cart
    closeCart();

    // 8. Turn the loading state off
    setLoading(false);
    nProgress.done();
  };
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphqlError && <p style={{ fontSize: 12 }}>{graphqlError.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
