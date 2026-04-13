const { getSession, updateSession, resetSession } = require('./sessionService');
const { createOrder, getOrderStatus } = require('./orderService');

const menu = {
  1: { name: 'Pizza', price: 100 },
  2: { name: 'Burger', price: 80 },
  3: { name: 'Coke', price: 40 },
};

function handleMessage(phone, message) {
  const session = getSession(phone);
  const text = message.trim().toUpperCase();

  if (text === 'MENU') {
    resetSession(phone);
    return getMenuMessage();
  }

  switch (session.state) {
    case 'INITIAL':
      if (text === 'HI') {
        updateSession(phone, 'MENU');
        return 'Welcome! Type MENU to see options.';
      }
      return 'Please type HI to start.';

    case 'MENU':
      if (menu[text]) {
        updateSession(phone, 'QUANTITY', { item: menu[text] });
        return `You selected ${menu[text].name}. Enter quantity:`;
      }
      return getMenuMessage();

    case 'QUANTITY':
      const quantity = parseInt(text, 10);
      if (!isNaN(quantity) && quantity > 0) {
        const total = session.data.item.price * quantity;
        updateSession(phone, 'CONFIRM', { ...session.data, quantity, total });
        return `Your total is ₹${total}. Confirm order? (YES/NO)`;
      }
      return 'Invalid quantity. Enter a valid number:';

    case 'CONFIRM':
      if (text === 'YES') {
        const order = createOrder(phone, session.data.item.name, session.data.quantity, session.data.total);
        resetSession(phone);
        return `Order confirmed! Your order ID is ${order.orderId}.`;
      } else if (text === 'NO') {
        resetSession(phone);
        return 'Order cancelled. Type MENU to start again.';
      }
      return 'Please reply with YES or NO.';

    default:
      resetSession(phone);
      return 'Session reset. Type MENU to start again.';
  }
}

function getMenuMessage() {
  return 'Menu:\n1. Pizza - ₹100\n2. Burger - ₹80\n3. Coke - ₹40\nSelect an item by typing the number.';
}

module.exports = { handleMessage };