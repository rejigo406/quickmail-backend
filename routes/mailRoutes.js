const express = require('express');
const router = express.Router();
const { getMails } = require('../controllers/mailController');

// test route
router.get('/', (req, res) => {
  res.send('📬 QuickMail API is working!');
});

// get mails
router.get('/mails', getMails);

module.exports = router;

