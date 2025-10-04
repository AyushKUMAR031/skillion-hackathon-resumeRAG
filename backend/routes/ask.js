const express = require('express');
const router = express.Router();
const askController = require('../controllers/askController');

router.post('/', askController.ask);

module.exports = router;
