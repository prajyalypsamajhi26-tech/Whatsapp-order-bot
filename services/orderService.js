const orders = [];

function createOrder(phone, item, quantity, total) {
  const orderId = `ORD-${Date.now()}`;
  const order = { orderId, phone, item, quantity, total, status: 'PENDING' };
  orders.push(order);
  return order;
}

function getOrderStatus(phone) {
  const order = orders.find(o => o.phone === phone);
  return order ? order : null;
}

module.exports = { createOrder, getOrderStatus };