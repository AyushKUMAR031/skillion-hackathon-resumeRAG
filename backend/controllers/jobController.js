const Job = require('../models/Job');
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

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
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
    const { generateEmbedding } = await import('../../ml/embedding.js');
    const { top_n } = req.body;
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const jobEmbedding = await generateEmbedding(job.description);
    const pineconeIndex = await initPinecone();

    const queryRequest = {
      vector: jobEmbedding,
      topK: 50, // Get more results to group from
      includeMetadata: true,
    };

    const queryResponse = await pineconeIndex.query(queryRequest);

    const candidates = queryResponse.matches.reduce((acc, match) => {
        const { resume_id, text, filename } = match.metadata;
        const { score } = match;

        if (!acc[resume_id]) {
            acc[resume_id] = {
                resume_id,
                scores: [],
                chunks: [],
                filename,
            };
        }
        acc[resume_id].scores.push(score);
        acc[resume_id].chunks.push(text);

        return acc;
    }, {});

    const rankedCandidates = Object.values(candidates).map(candidate => {
        const avgScore = candidate.scores.reduce((a, b) => a + b, 0) / candidate.scores.length;
        const bestChunk = candidate.chunks.join('\n\n'); // For now, just join the chunks
        return {
            resume_id: candidate.resume_id,
            filename: candidate.filename,
            score: avgScore,
            evidence: bestChunk,
            missing_requirements: getMissingRequirements(job.description, bestChunk),
        }
    });

    const matchedCandidates = rankedCandidates
        .sort((a, b) => b.score - a.score)
        .slice(0, top_n || 5);


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
