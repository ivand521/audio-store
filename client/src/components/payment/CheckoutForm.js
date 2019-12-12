import React, { Component } from 'react';
import axios from 'axios';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements';

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
    paymentComplete: false
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleToken = async token => {
    const res = await axios.post('http://localhost:5000/api/stripe', token);
    console.log(res);
  };

  handleSubmit = async e => {
    e.preventDefault();

    const token = await this.props.stripe.createToken({ address_city: 'name' });
    this.handleToken(token);
    console.log(token);
  };

  render() {
    return (
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
            <CardCVCElement {...createOptions()} onChange={this.handleChange} />
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
    );
  }
}

export default injectStripe(CheckoutForm);
