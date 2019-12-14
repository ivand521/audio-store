import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {
  return (
    <div>
      <h1>
        Thank you for your purchase! You will receive your order confirmation
        and audio download in your email shortly.
      </h1>
      <Link to='/'>Home</Link>
    </div>
  );
};

export default ConfirmationPage;
