const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  redacted_text: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
