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
import { emptyCart } from '../../actions/cart';
import calculateTotal from '../../utils/calculateTotal';

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#c23d4b'
      }
    }
  };
};

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
    }
  };

  onContactChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = async e => {
    e.preventDefault();
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
      console.log(paymentIntent);

      if (paymentIntent.status === 'succeeded') {
        this.props.emptyCart();
        this.setState(() => ({ paymentComplete: true }));
      }
    } catch (err) {
      console.log(this.props.cart);
      console.log(err.message);
    }
  };

  render() {
    const { paymentComplete, name, email, loading, errorMessage } = this.state;
    return paymentComplete ? (
      <Redirect to='/confirmation' />
    ) : (
      <div>
        {loading && <Spinner />}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='split-form'>
            <label>
              Name{' '}
              <input
                type='text'
                name='name'
                value={name}
                onChange={this.onContactChange}
                required
              />
            </label>
            <label>
              Email{' '}
              <input
                type='email'
                name='email'
                value={email}
                onChange={this.onContactChange}
                required
              />
            </label>
            <label>
              Card number
              <CardNumberElement
                {...createOptions()}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Expiration date
              <CardExpiryElement
                {...createOptions()}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='split-form'>
            <label>
              CVC
              <CardCVCElement
                {...createOptions()}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Postal code
              <input
                name='name'
                type='text'
                placeholder='94115'
                className='StripeElement'
                required
              />
            </label>
          </div>
          <div className='error' role='alert'>
            {errorMessage}
          </div>
          <button>Pay</button>
        </form>
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
