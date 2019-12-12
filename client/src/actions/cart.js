import {
  SETUP_CART,
  ADD_TO_CART,
  CHANGE_QUANTITY,
  REMOVE_FROM_CART,
  EMPTY_CART,
  UPDATE_LOCAL_STORAGE
} from './types';

export const setupCart = cart => dispatch => {
  dispatch({
    type: SETUP_CART,
    payload: cart
  });
};

export const addToCart = (title, price, quantity = 1) => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: { title, price, quantity, total: price * quantity }
  });

  dispatch({ type: UPDATE_LOCAL_STORAGE });
};

export const changeQuantity = (title, quantity) => dispatch => {
  dispatch({
    type: CHANGE_QUANTITY,
    payload: { title, quantity }
  });
  dispatch({ type: UPDATE_LOCAL_STORAGE });
};

export const removeFromCart = title => dispatch => {
  dispatch({ type: REMOVE_FROM_CART, payload: { title } });
  dispatch({ type: UPDATE_LOCAL_STORAGE });
};

export const emptyCart = () => dispatch => {
  dispatch({ type: EMPTY_CART });
  dispatch({ type: UPDATE_LOCAL_STORAGE });
};
