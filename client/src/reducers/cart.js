import {
  SETUP_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_QUANTITY,
  EMPTY_CART,
  UPDATE_LOCAL_STORAGE
} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SETUP_CART:
      return [...payload];
    case ADD_TO_CART:
      if (state.find(product => product.title === payload.title)) {
        return state.map(product => {
          if (product.title !== payload.title) {
            return product;
          }

          const quantity = product.quantity + payload.quantity;
          const price = product.price;
          return { ...payload, quantity, total: price * quantity };
        });
      }
      return [...state, payload];
    case CHANGE_QUANTITY:
      return state.map(product => {
        if (product.title !== payload.title) {
          return product;
        }
        const quantity = payload.quantity;
        const price = product.price;

        return { ...product, quantity, total: price * quantity };
      });
    case REMOVE_FROM_CART:
      return state.filter(item => item.title !== payload.title);
    case EMPTY_CART:
      return [];
    case UPDATE_LOCAL_STORAGE:
      if (!state.length) {
        localStorage.removeItem('audioCart');
      } else {
        const string = JSON.stringify(state);
        localStorage.setItem('audioCart', string);
      }
      return state;
    default:
      return state;
  }
}
