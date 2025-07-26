const express = require('express');
const router = express.Router();

// GET /api/hello
router.get('/', (req, res) => {
  res.json({ message: 'Hello, REST API!' });
});

module.exports = router;
