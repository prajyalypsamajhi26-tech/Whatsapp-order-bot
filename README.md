#  WhatsApp Food Ordering Chatbot (Node.js + Express + whatsapp-web.js)

A real-time WhatsApp chatbot built using Node.js, Express, and whatsapp-web.js.  
The bot connects via QR code and simulates a full food ordering system inside WhatsApp with session handling and user personalization.

---

##  Features

-  WhatsApp login via QR code
-  Menu-based food ordering system
-  Step-by-step conversation flow (state machine)
-  Automatic user name detection (WhatsApp contact API)
-  Order confirmation system
-  Order status tracking
-  Multi-user session handling (based on phone number)
-  Clean modular backend structure
-  Scalable for database / AI / deployment upgrades

---

## User Personalization

Bot automatically detects user name:

- Primary: `msg.getContact()`
- Fallback: phone number

Example:
Welcome to SnackStop, Rahul 👋

Fallback:
Welcome to SnackStop, there 👋

---

## Chat Flow

User: hi  
Bot: Welcome to SnackStop, Rahul 👋 Reply MENU to see today's items.

User: menu  
Bot:
1. Masala Popcorn - ₹49  
2. Cold Coffee - ₹79  
3. Veg Sandwich - ₹99  
4. Brownie - ₹59  
Reply with item number to order.

User: 2  
Bot: You selected Cold Coffee ₹79. How many?

User: 2  
Bot: 2x Cold Coffee = ₹158. Reply YES to confirm or NO to cancel.

User: yes  
Bot: Order confirmed 🎉 Your Order ID is #1042. Delivery in 30 minutes 🚀

User: status  
Bot: Order #1042 | Cold Coffee x2 | Status: Preparing 🟡

---

##  Project Structure

src/
├── client.js              # WhatsApp connection (QR login)
├── server.js             # Express server (optional)
├── handlers/
│     └── messageHandler.js   # Chat logic + state machine
├── services/
│     └── sessionService.js   # In-memory session storage

---

## System Flow

User Message → WhatsApp Web → Message Handler → Session Manager → Response → WhatsApp Reply

Each user is tracked using phone number and state is stored in memory.

---

##  Tech Stack

- Node.js
- Express.js
- whatsapp-web.js
- qrcode-terminal

---

##  Installation

git clone https://github.com/your-username/whatsapp-bot.git  
cd whatsapp-bot  
npm install  

---


## Setup

1. Run project
2. Scan QR code from terminal using WhatsApp
3. Start chatting:
   - hi
   - menu
   - order items
   - status

---

## Future Improvements

- MongoDB / SQLite database integration
- AI chatbot mode (ChatGPT)
- Cloud deployment (Render / Railway / VPS)
- Admin dashboard for orders
- Payment integration
- Real delivery system integration

---

## License

MIT
