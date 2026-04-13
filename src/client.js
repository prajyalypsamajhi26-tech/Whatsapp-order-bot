const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleMessage } = require('./handlers/messageHandler'); // Import handleMessage

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true, // Run Puppeteer in headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add Puppeteer flags for stability
  },
});

client.on('qr', (qr) => {
  console.log('Scan this QR code to connect:');
  qrcode.generate(qr, { small: true });
});

let isMessageHandlerRegistered = false; // Track if the message handler is already registered

client.on('ready', () => {
  console.log('WhatsApp bot ready');

  if (!isMessageHandlerRegistered) {
    client.on('message', async (message) => {
      const userId = normalizePhoneNumber(message.from);
      const contact = await message.getContact(); // Get contact details
      const userName = contact.pushname || contact.name || userId || 'there'; // Extract user name with fallback
      const normalizedMessage = message.body.trim().toLowerCase(); // Normalize message body

      console.log(`Received message from: ${userId}, Message: ${normalizedMessage}`); // Log incoming message
      console.log(`User name: ${userName}`); // Log user name

      // Check if the message has already been processed
      if (message.hasBeenProcessed) {
        console.log(`Message from ${userId} already processed.`);
        return;
      }
      message.hasBeenProcessed = true; // Mark message as processed

      const response = await handleMessage(userId, { body: normalizedMessage, userName });
      if (response) {
        console.log(`Replying to ${userId}: ${response}`); // Debugging log
        message.reply(response);
      } else {
        console.log(`No response generated for message from ${userId}`); // Debugging log
      }
    });
    isMessageHandlerRegistered = true; // Mark the handler as registered
  }
});

client.on('disconnected', (reason) => {
  console.error('Client was disconnected:', reason);
  console.log('Reinitializing client...');
  client.initialize(); // Reinitialize the client on disconnection
});

client.on('auth_failure', (msg) => {
  console.error('Authentication failed:', msg);
});

const normalizePhoneNumber = (phoneNumber) => {
  // Remove non-numeric characters and strip WhatsApp suffix (e.g., @c.us)
  return phoneNumber.split('@')[0].replace(/\D/g, '');
};

module.exports = client;