const express = require('express');
const router = express.Router();
const { getMails } = require('../controllers/mailController');

router.get('/mails', getMails);

module.exports = router;
