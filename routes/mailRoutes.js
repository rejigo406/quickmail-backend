const express = require('express');
const router = express.Router();
const { getMails } = require('../controllers/mailController');

router.get('/', (req, res) => {
  res.send('📬 QuickMail API is working!');
});

router.get('/mails', getMails);

module.exports = router;
