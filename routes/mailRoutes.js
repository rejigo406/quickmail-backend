const express = require('express');
const router = express.Router();
const { getMails } = require('../controllers/mailController');

router.get('/mails', getMails);

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('📬 QuickMail API is working!');
});

module.exports = router;
