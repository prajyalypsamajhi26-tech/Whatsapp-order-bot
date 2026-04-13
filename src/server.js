// Express server setup
const express = require('express');
const client = require('./client');
const messageHandler = require('./handlers/messageHandler');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

client.initialize();