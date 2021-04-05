import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import SickButton from './styles/SickButton';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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
    if (error) setError(error);

    // 5. Send the token from step 3 to our Keystone.js server via a custom mutation!
    // 6. Change the page to view the order
    // 7. Close the cart

    // 8. Turn the loading state off
    setLoading(false);
    nProgress.done();
  };
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
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
