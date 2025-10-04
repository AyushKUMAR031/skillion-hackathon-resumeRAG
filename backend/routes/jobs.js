
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/', jobController.createJob);
router.get('/:id', jobController.getJobById);
router.post('/:id/match', jobController.matchJob);

module.exports = router;
