#  WhatsApp Food Ordering Chatbot (Node.js + Express + whatsapp-web.js)

A real-time WhatsApp chatbot built using Node.js, Express, and whatsapp-web.js.  
The bot connects via QR code and simulates a full food ordering system inside WhatsApp with session handling and user personalization.

---

## System Flow

User Message  
→ WhatsApp Web (QR Authentication)  
→ Message Handler (Business Logic)  
→ Session Manager (User State Tracking)  
→ Response Generation  
→ WhatsApp Reply  

Each user session is tracked using their phone number.

---

## Project Structure


src/
├── client.js # WhatsApp client setup (QR login)
├── server.js # Express server setup (optional)
├── handlers/
│ └── messageHandler.js # Chatbot logic and flow control
├── services/
│ └── sessionService.js # Session and state management


---

## Tech Stack

- Node.js  
- Express.js  
- whatsapp-web.js  
- qrcode-terminal  

---

## Installation

Clone the repository:


git clone https://github.com/your-username/whatsapp-bot.git

cd whatsapp-bot


Install dependencies:


npm install


---

## Running the Project

Start the application:


npm run dev


OR


node src/client.js


---

## Setup Instructions

1. Run the project using the above command  
2. A QR code will appear in the terminal  
3. Open WhatsApp on your phone  
4. Go to Linked Devices  
5. Scan the QR code  

Once connected, the bot is ready to use.

---

## Usage

- Send "hi" to start interaction
- Send "menu" to view items  
- Enter item number to select  
- Enter quantity  
- Send "yes" to confirm order  
- Send "status" to check order  

---

## Important Notes

- Only one `client.on('message')` listener should be used  
- Do not run multiple instances of the bot  
- Sessions are stored in memory and will reset on server restart  
- Input is normalized using `.toLowerCase().trim()`  

---

## Limitations

- No database integration (data is not persistent)  
- No payment gateway  
- Runs locally only  
- Limited to predefined menu  

---

## Future Improvements

- Integrate MongoDB or SQLite for persistent storage  
- Deploy on cloud platforms (Render, Railway, etc.)  
- Add AI-based conversational support  
- Implement payment gateway  
- Develop admin dashboard for order management  

---

## License

This project is licensed under the MIT License.
