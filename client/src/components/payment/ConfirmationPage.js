import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {
  return (
    <div>
      <h1>Your payment is successfully processed.</h1>
      <Link to='/'>Home</Link>
    </div>
  );
};

export default ConfirmationPage;
