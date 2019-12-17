const express = require('express');
const stripeRouter = require('./routes/stripe');
const wakeUpDyno = require('./utils/wakeUpDyno');

const URL = 'https://subaudio.herokuapp.com';

const app = express();

app.use(express.json());
app.use(stripeRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
  wakeUpDyno(URL);
});
