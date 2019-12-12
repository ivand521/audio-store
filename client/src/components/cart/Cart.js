import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart, changeQuantity } from '../../actions/cart';

const Cart = ({ cart, removeFromCart, changeQuantity }) => {
  const [total, setTotal] = useState(0);

  const calculateTotal = cart => {
    const total = cart.reduce((current, item) => current + item.total, 0);
    setTotal(total);
  };

  const onQuantityChange = e => {
    const title = e.target.name;
    const qty = Number(e.target.value);

    changeQuantity(title, qty);
  };

  useEffect(() => {
    calculateTotal(cart);
  }, [cart]);

  return cart.length ? (
    <div>
      {cart.map((item, index) => (
        <div className='item' key={index}>
          {item.title} ----------- ${item.price} X{' '}
          <input
            type='number'
            min={1}
            name={item.title}
            value={item.quantity}
            onChange={onQuantityChange}
          />{' '}
          ${item.total}
          <button
            onClick={() => {
              removeFromCart(item.title);
              calculateTotal(cart);
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>{`Subtotal: $${total}`}</h3>
      <Link to='/checkout'>Check Out</Link>
    </div>
  ) : (
    <h3>Your cart is empty</h3>
  );
};

const mapStateToProps = ({ cart }) => ({
  cart
});

export default connect(mapStateToProps, { removeFromCart, changeQuantity })(
  Cart
);
