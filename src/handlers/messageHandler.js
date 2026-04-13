const sessions = new Map(); // Store user sessions

function handleMessage(userId, message) {
  // Debugging: Log the incoming message object
  console.log('Received message:', message);

  // Ensure message and message.body are valid
  if (!message || typeof message.body !== 'string') {
    return 'Sorry, I didn’t understand that. Please try again.';
  }

  const text = message.body.trim().toLowerCase(); // Normalize input

  // Respond to 'hi' regardless of session state
  if (text === 'hi') {
    return 'Hello! Welcome to SnackStop 👋\nReply MENU to see today\'s items.';
  }

  const session = sessions.get(userId) || { state: 'GREETING', data: {} };

  // Reset session if user says "start again"
  if (text === 'start again') {
    sessions.delete(userId);
    return 'Session reset. Reply MENU to start again.';
  }

  // Always show menu if user says "menu"
  if (text === 'menu') {
    session.state = 'MENU';
    sessions.set(userId, session);
    return getMenuMessage();
  }

  // Cancel order flow if user says "cancel"
  if (text === 'cancel') {
    sessions.delete(userId);
    return 'Order cancelled. Reply MENU to start again.';
  }

  switch (session.state) {
    case 'GREETING':
      session.state = 'MENU';
      sessions.set(userId, session);
      return 'Welcome to SnackStop 👋\nReply MENU to see today\'s items.';

    case 'MENU':
      if (['1', '2', '3', '4'].includes(text)) {
        const items = {
          '1': { name: 'Masala Popcorn', price: 49 },
          '2': { name: 'Cold Coffee', price: 79 },
          '3': { name: 'Veg Sandwich', price: 99 },
          '4': { name: 'Brownie', price: 59 },
        };
        session.state = 'QUANTITY';
        session.data.item = items[text];
        sessions.set(userId, session);
        return `You selected ${items[text].name} ₹${items[text].price}.\nHow many would you like? Reply with a number.`;
      }
      return 'Invalid input. Reply with the number to order (e.g., 2).';

    case 'QUANTITY':
      const quantity = parseInt(text, 10);
      if (!isNaN(quantity) && quantity > 0) {
        session.state = 'CONFIRMATION';
        session.data.quantity = quantity;
        session.data.total = session.data.item.price * quantity;
        sessions.set(userId, session);
        return `Got it 👍\n${quantity}x ${session.data.item.name} = ₹${session.data.total}\n\nReply YES to confirm or NO to cancel.`;
      }
      return 'Invalid quantity. Please reply with a valid number.';

    case 'CONFIRMATION':
      if (text === 'yes') {
        const orderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
        session.state = 'ORDER_CONFIRMED';
        session.data.orderId = orderId;
        sessions.set(userId, session);
        return `Order confirmed 🎉\nYour Order ID is ${orderId}\n\nWe'll deliver in 30 minutes 🚀\n\nReply STATUS anytime to check your order.`;
      } else if (text === 'no') {
        sessions.delete(userId);
        return 'Order cancelled. Reply MENU to start again.';
      }
      return 'Invalid input. Reply YES to confirm or NO to cancel.';

    case 'ORDER_CONFIRMED':
      if (text === 'status') {
        return `Order ${session.data.orderId}\n${session.data.item.name} x${session.data.quantity}\nStatus: Preparing 🟡`;
      }
      return 'Invalid input. Reply STATUS to check your order.';

    default:
      sessions.delete(userId);
      return 'Session reset. Reply MENU to start again.';
  }
}

function getMenuMessage() {
  return 'Here\'s what we have today:\n\n1. Masala Popcorn - ₹49\n2. Cold Coffee - ₹79\n3. Veg Sandwich - ₹99\n4. Brownie - ₹59\n\nReply with the number to order (e.g., 2).';
}

module.exports = { handleMessage };