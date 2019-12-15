import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart, changeQuantity } from '../../actions/cart';
import calculateTotal from '../../utils/calculateTotal';
import './Cart.css';

const Cart = ({ cart, removeFromCart, changeQuantity }) => {
  const [total, setTotal] = useState(0);

  const onQuantityChange = e => {
    const title = e.target.name;
    const qty = Number(e.target.value);

    changeQuantity(title, qty);
  };

  useEffect(() => {
    setTotal(calculateTotal(cart));
  }, [cart]);

  return cart.length ? (
    <div className='cart-container'>
      <div className='cart'>
        <h1>Shopping Cart</h1>
        <div>
          <h3>Product</h3>
          <h3>Price</h3>
          <h3>Qty</h3>
          <h3>Total</h3>
        </div>
        {cart.map((item, index) => (
          <div key={index}>
            <p>{item.title}</p>
            <p>${item.price}</p>
            <p>{item.quantity}</p>
            <p>${item.total}</p>
            {/* <input
              type='number'
              min={1}
              name={item.title}
              value={item.quantity}
              onChange={onQuantityChange}
            />{' '} */}
            <button
              onClick={() => {
                removeFromCart(item.title);
                setTotal(calculateTotal(cart));
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <h3>{`Subtotal: $${total}`}</h3>
        <Link className='dark-button' to='/checkout'>
          Check Out
        </Link>
      </div>
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
