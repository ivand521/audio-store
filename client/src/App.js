import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Products from './components/products/Products';
import ProductPage from './components/products/ProductPage';
import About from './components/about/About';
import Cart from './components/cart/Cart';
import Payment from './components/payment/Payment';
import ConfirmationPage from './components/payment/ConfirmationPage';
import './App.css';

import products from './utils/products';
import { setupCart } from './actions/cart';

const App = ({ setupCart }) => {
  useEffect(() => {
    if (localStorage.audioCart) {
      const cart = JSON.parse(localStorage.audioCart);
      setupCart(cart);
    }
  });

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/products' component={Products} />
        <Route path='/about' component={About} />
        <Route path='/cart' component={Cart} />
        <Route path='/checkout' component={Payment} />
        <Route path='/confirmation' component={ConfirmationPage} />

        {products.map(({ title, route, price, image }) => (
          <Route
            key={title}
            path={`/${route}`}
            render={() => (
              <ProductPage image={image} title={title} price={price} />
            )}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default connect(null, { setupCart })(App);
