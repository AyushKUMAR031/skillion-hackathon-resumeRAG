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
  embedding: {
    type: Array,
  },
  pii: {
    type: Object,
  }
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
