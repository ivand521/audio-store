import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements';
import Spinner from './Spinner';
import './CheckoutForm.css';
import { emptyCart } from '../../actions/cart';
import calculateTotal from '../../utils/calculateTotal';

class CheckoutForm extends Component {
  state = {
    errorMessage: '',
    paymentComplete: false,
    loading: false,
    name: '',
    email: ''
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    } else {
      this.setState({ errorMessage: '' });
    }
  };

  onContactChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = async e => {
    e.preventDefault();

    if (this.state.errorMessage || this.state.loading) {
      return;
    }

    this.setState(() => ({ loading: true }));
    this.setState(() => ({ subTotal: calculateTotal(this.props.cart) }));

    try {
      const { name, email } = this.state;
      const subTotal = calculateTotal(this.props.cart);
      const body = { name, email, subTotal };

      const res = await axios.post('/api/stripe', body);
      const clientSecret = res.data;

      const { paymentIntent } = await this.props.stripe.handleCardPayment(
        `${clientSecret}`,
        <CardNumberElement />
      );

      if (paymentIntent.status === 'succeeded') {
        this.props.emptyCart();
        this.setState(() => ({ paymentComplete: true }));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { paymentComplete, name, email, loading, errorMessage } = this.state;
    return paymentComplete ? (
      <Redirect to='/confirmation' />
    ) : (
      <div className='flex-wrapper'>
        {loading && <Spinner />}

        <div className='form-container'>
          <h1 className='checkout-title'>Complete Your Purchase</h1>{' '}
          <form
            className='checkout-form'
            onSubmit={this.handleSubmit.bind(this)}
          >
            <div className='column-span'>
              <label>Name </label>
            </div>

            <div className='column-span'>
              <input
                className='input-span checkout-input'
                type='text'
                name='name'
                value={name}
                onChange={this.onContactChange}
                required
              />
            </div>

            <div className='column-span'>
              <label>Email </label>
            </div>

            <div className='column-span'>
              <input
                className='input-span checkout-input'
                type='email'
                name='email'
                value={email}
                onChange={this.onContactChange}
                required
              />
            </div>

            <div className='column-span'>
              <label>Card number</label>
            </div>

            <div className='column-span'>
              <CardNumberElement
                className='checkout-input input-span'
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Expiration date</label>
              <CardExpiryElement
                className='checkout-input expiration'
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>CVC</label>
              <CardCVCElement
                className='checkout-input'
                onChange={this.handleChange}
              />
            </div>

            {/* <div>
              <label>
                Postal code
                <input
                  className='checkout-input'
                  name='name'
                  type='text'
                  placeholder='94115'
                  className='StripeElement'
                  required
                />
              </label>
            </div> */}

            <div className='error column-span' role='alert'>
              {errorMessage}
            </div>
            <div className='column-span'>
              <button className='checkout-button'>Pay</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cart
});

export default connect(mapStateToProps, { emptyCart })(
  injectStripe(CheckoutForm)
);
