const Job = require('../models/Job');
const { generateEmbedding } = require('../../ml/embedding');
const { initPinecone } = require('../pinecone');

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
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const jobEmbedding = await generateEmbedding(job.description);
    const pineconeIndex = await initPinecone();

    const queryRequest = {
      vector: jobEmbedding,
      topK: top_n || 5,
      includeMetadata: true,
    };

    const queryResponse = await pineconeIndex.query(queryRequest);

    const matchedCandidates = queryResponse.matches.map(match => {
        const missing_requirements = getMissingRequirements(job.description, match.metadata.text);
        return {
            resume_id: match.metadata.resume_id,
            score: match.score,
            evidence: match.metadata.text,
            missing_requirements,
        }
    });

    res.status(200).json({ matchedCandidates });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function getMissingRequirements(jobDescription, resumeText) {
    // This is a very basic implementation. A more sophisticated approach would use NLP to extract skills.
    const requiredSkills = jobDescription.toLowerCase().match(/\b(python|javascript|react|node.js|aws|docker|sql)\b/g) || [];
    const missing = [];
    for (const skill of requiredSkills) {
        if (!resumeText.toLowerCase().includes(skill)) {
            missing.push(skill);
        }
    }
    return [...new Set(missing)]; // Return unique missing skills
}
