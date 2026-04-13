// Express server setup
const express = require('express');
const client = require('./client');
const messageHandler = require('./handlers/messageHandler');

const app = express();
const PORT = 3000;

client.on('message', async (msg) => {
  console.log(`Message received from ${msg.from}: ${msg.body}`);
  const response = await messageHandler.handleMessage(msg.from, msg); // Pass correct arguments
  if (response) {
    msg.reply(response);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

client.initialize();