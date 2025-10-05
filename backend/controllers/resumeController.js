const Resume = require('../models/Resume');
const pdf = require('pdf-parse');
const fs = require('fs');
const JSZip = require('jszip');
const { generateEmbedding } = require('../../ml/embedding');
const { initPinecone } = require('../pinecone');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let text = '';
    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(req.file.path);
      const data = await pdf(dataBuffer);
      text = data.text;
    } else if (req.file.mimetype === 'application/zip') {
      const data = fs.readFileSync(req.file.path);
      const zip = await JSZip.loadAsync(data);
      for (const filename in zip.files) {
        const file = zip.files[filename];
        if (!file.dir && filename.endsWith('.pdf')) {
          const content = await file.async('nodebuffer');
          const data = await pdf(content);
          text += data.text + '\n';
        }
      }
    }

    const newResume = new Resume({
      filename: req.file.originalname,
      text: text, // We can still save the full text for reference
    });

    const savedResume = await newResume.save();

    // Chunking and embedding
    const pineconeIndex = await initPinecone();
    const chunks = chunkText(text);
    const vectors = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await generateEmbedding(chunk);
      vectors.push({
        id: `${savedResume._id}-chunk-${i}`,
        values: embedding,
        metadata: {
          resume_id: savedResume._id.toString(),
          chunk_index: i,
          text: chunk,
        },
      });
    }

    await pineconeIndex.upsert(vectors);

    res.status(201).json({ message: 'Resume uploaded, parsed, and embedded successfully', resume: savedResume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function chunkText(text, chunkSize = 800) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.substring(i, i + chunkSize));
    }
    return chunks;
}


exports.getResumes = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const resumes = await Resume.find().skip(offset).limit(limit);
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
