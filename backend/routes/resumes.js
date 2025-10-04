const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.post('/', resumeController.uploadResume);

module.exports = router;
