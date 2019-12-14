const calculateTotal = cart => {
  return cart.reduce((current, item) => current + item.total, 0);
};

export default calculateTotal;
