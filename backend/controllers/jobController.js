const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newJob = new Job({
      title,
      description,
    });

    const savedJob = await newJob.save();

    res.status(201).json({ message: 'Job created successfully', job: savedJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.matchJob = async (req, res) => {
  try {
    const { top_n } = req.body;
    // Placeholder for matching logic
    const matchedCandidates = [
      { resume_id: 'dummy_id_1', score: 0.9, evidence: 'React experience', missing_requirements: ['AWS'] },
      { resume_id: 'dummy_id_2', score: 0.8, evidence: 'Node.js experience', missing_requirements: ['Docker'] },
    ];

    res.status(200).json({ matchedCandidates });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
