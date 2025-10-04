const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const upload = require('../middleware/upload');

router.post('/', upload, resumeController.uploadResume);

module.exports = router;
