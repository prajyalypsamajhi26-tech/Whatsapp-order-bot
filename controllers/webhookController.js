const client = require('../config/twilio');
const { handleMessage } = require('../services/messageService');

async function webhook(req, res) {
  const { Body, From } = req.body;
  const responseMessage = handleMessage(From, Body);

  try {
    await client.messages.create({
      body: responseMessage,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: From,
    });
    res.status(200).send('Message processed');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Failed to process message');
  }
}

module.exports = { webhook };