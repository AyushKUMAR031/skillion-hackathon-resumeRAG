const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const resumeRoutes = require('./routes/resumes');
app.use('/api/resumes', resumeRoutes);

const askRoutes = require('./routes/ask');
app.use('/api/ask', askRoutes);

const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send('ResumeRAG API');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
