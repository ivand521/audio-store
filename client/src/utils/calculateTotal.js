const calculateTotal = cart => {
  return +cart.reduce((current, item) => current + item.total, 0).toFixed(2);
};

export default calculateTotal;
