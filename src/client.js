// WhatsApp client setup using whatsapp-web.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  console.log('Scan this QR code to connect:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp bot ready');
});

client.on('auth_failure', (msg) => {
  console.error('Authentication failed:', msg);
});

client.on('disconnected', (reason) => {
  console.error('Client disconnected:', reason);
});

client.on('change_state', (state) => {
  console.log('Connection state changed:', state);
});

client.on('connecting', () => {
  console.log('Connecting to WhatsApp...');
});

client.on('authenticated', () => {
  console.log('Successfully authenticated with WhatsApp.');
});

module.exports = client;