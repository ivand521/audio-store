import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cart';
import './ProductPage.css';

const ProductPage = ({ image, title, price, addToCart }) => {
  return (
    <div className='info-container'>
      <div>
        <img src={image} alt={title} />
      </div>
      <div>
        <p>
          {title}--{price}
        </p>
        <button
          onClick={() => {
            addToCart(title, price);
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default connect(null, { addToCart })(ProductPage);
