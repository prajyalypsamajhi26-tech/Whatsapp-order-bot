const sessions = new Map();

function getSession(phone) {
  if (!sessions.has(phone)) {
    sessions.set(phone, { state: 'INITIAL', data: {} });
  }
  return sessions.get(phone);
}

function updateSession(phone, newState, newData = {}) {
  if (sessions.has(phone)) {
    sessions.set(phone, { state: newState, data: newData });
  }
}

function resetSession(phone) {
  sessions.delete(phone);
}

module.exports = { getSession, updateSession, resetSession };