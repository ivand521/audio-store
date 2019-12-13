import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements';
import { emptyCart } from '../../actions/cart';

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
    loading: false
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState(() => ({ loading: true }));

    try {
      const res = await axios.get('/api/stripe');
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
      console.log(err.message);
    }
  };

  render() {
    return this.state.paymentComplete ? (
      <Redirect to='/confirmation' />
    ) : (
      <div>
        {this.state.loading && <Spinner />}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='split-form'>
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
            {this.state.errorMessage}
          </div>
          <button>Pay</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { emptyCart })(injectStripe(CheckoutForm));
