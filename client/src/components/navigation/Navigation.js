import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Navigation.css';

const Navigation = ({ cart }) => {
  const calculateTotalItems = () =>
    cart.reduce((current, { quantity }) => {
      return quantity + current;
    }, 0);

  return (
    <nav className='navigation'>
      <ul className='routes'>
        <li>
          <Link className='route' to='/'>
            <h2>Subliminal Audio Store</h2>
          </Link>
        </li>
        <div className='right'>
          <li>
            <Link className='route' to='/products'>
              Products
            </Link>
          </li>
          <li>
            <Link className='route' to='/about'>
              About
            </Link>
          </li>
          <li>
            <Link className='route' to='/cart'>
              Cart{' '}
              <span style={{ color: 'green' }}>
                {cart.length ? calculateTotalItems() : ''}
              </span>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ cart }) => ({
  cart
});

export default connect(mapStateToProps)(Navigation);
