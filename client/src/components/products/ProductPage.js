import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cart';
import './ProductPage.css';

const ProductPage = ({ image, title, price, description, addToCart }) => {
  return (
    <div className='info-container'>
      <div>
        <img className='product-image' src={image} alt={title} />
      </div>
      <div className='information product-information'>
        <h2>
          {title} -${price}
        </h2>
        <button
          className='dark-button'
          onClick={() => {
            addToCart(title, price);
          }}
        >
          Add To Cart
        </button>
        <p className='text'>{description}</p>
      </div>
    </div>
  );
};

export default connect(null, { addToCart })(ProductPage);
