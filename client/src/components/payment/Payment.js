import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
      <div className='example'>
        <h1>Complete Your Purchase</h1>
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    </StripeProvider>
  );
};

export default Payment;
