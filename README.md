# WhatsApp Chatbot with Node.js, Express, and Twilio

This project is a WhatsApp chatbot built using Node.js, Express, and the Twilio API. The bot handles user interactions, manages sessions, and processes orders.

## Features
- State-machine-based chatbot with session handling.
- Menu-driven interaction.
- Order creation and status tracking.
- Twilio WhatsApp API integration.

## Prerequisites
- Node.js installed.
- Twilio account with WhatsApp Sandbox enabled.
- Ngrok for exposing localhost.

## Environment Variables
Create a `.env` file in the root directory with the following:
```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
PORT=3000
```

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server: `npm run dev`.
4. Expose the server using Ngrok: `ngrok http 3000`.
5. Set the webhook URL in Twilio to `https://<ngrok-url>/webhook`.

## Usage
- Send "Hi" to the WhatsApp number to start.
- Follow the menu options to place an order.
- Send "STATUS" to check the latest order status.

## Scripts
- `npm run dev`: Start the development server with Nodemon.

## Folder Structure
- `index.js`: Entry point.
- `config/twilio.js`: Twilio client configuration.
- `controllers/webhookController.js`: Webhook logic.
- `services/messageService.js`: Chatbot logic.
- `services/sessionService.js`: Session management.
- `services/orderService.js`: Order management.

## License
MIT

# WhatsApp Chatbot Backend

This project is a WhatsApp chatbot backend built using `whatsapp-web.js` and `express`. The bot connects to WhatsApp via QR code and replies to messages.

## Features
- Connects to WhatsApp via QR code.
- Replies to messages based on predefined logic.
- Modular architecture for clean code.

## Prerequisites
- Node.js installed.
- WhatsApp account.

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server: `npm run dev`.

## Usage
1. Scan the QR code displayed in the terminal to connect the bot to WhatsApp.
2. Send messages to the bot:
   - Send "hi" → Bot replies "Hello 👋 I am your bot".
   - Send "help" → Bot replies with available commands.
   - Any other message → Bot replies "Sorry, I didn’t understand that".

## Folder Structure
- `src/client.js`: WhatsApp client setup.
- `src/server.js`: Express server setup.
- `src/handlers/messageHandler.js`: Message handling logic.
- `src/routes/webhook.js`: Optional API routes.

## License
MIT