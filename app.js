const express = require('express');

const bodyParser = require('body-parser');

const authroute = require('./routes/authRoutes');
const recordRoute = require('./routes/recordRoutes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allowed-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE');
  res.setHeader('Access-Control-Allowed-Headers', 'Content-Type', 'Authorization');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api/v1/auth', authroute);
app.use('/api/v1', recordRoute);

app.use((req, res) => {
  res.status(404).json({ status: 404, message: 'Routes Not found' });
  res.end();
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Connected on ${port}`);
});