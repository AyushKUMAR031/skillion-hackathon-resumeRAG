const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  embedding: {
    type: Array,
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
