import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

import products from '../../utils/products';

const Products = () => {
  return (
    <div>
      <h1 className='products-heading'>Products</h1>
      <div className='grid-wrapper'>
        {products.map(({ route, image, title, price }) => (
          <div className='box' key={title}>
            <Link to={`/${route}`}>
              <img src={image} alt={title} />
            </Link>

            <div className='price-tag'>
              <p className='title'>{title}</p>
              <h3 className='price'>${price}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
