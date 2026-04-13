require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const { webhook } = require('./controllers/webhookController');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook', webhook);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});