const Resume = require('../models/Resume');

exports.uploadResume = async (req, res) => {
  try {
    res.status(201).json({ message: 'Resume uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
