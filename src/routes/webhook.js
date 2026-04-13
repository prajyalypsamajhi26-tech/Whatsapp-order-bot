// Optional API routes
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Webhook is working');
});

module.exports = router;