const Resume = require('../models/Resume');
const pdf = require('pdf-parse');
const fs = require('fs');
const JSZip = require('jszip');
const { initPinecone } = require('../pinecone');

async function processResume(text, filename) {
    const { generateEmbedding } = await import('../../ml/embedding.js');

    const newResume = new Resume({
        filename,
        text, // We can still save the full text for reference
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
                filename: filename,
            },
        });
    }

    await pineconeIndex.upsert(vectors);
    return savedResume;
}


exports.uploadResume = async (req, res) => {
  console.log('Inside uploadResume');
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('Uploaded file mimetype:', req.file.mimetype);

    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(req.file.path);
      const data = await pdf(dataBuffer);
      const savedResume = await processResume(data.text, req.file.originalname);
      res.status(201).json({ message: 'Resume uploaded, parsed, and embedded successfully', resume: savedResume });
    } else if (req.file.mimetype === 'application/zip' || req.file.mimetype === 'application/x-zip-compressed') {
      const data = fs.readFileSync(req.file.path);
      const zip = await JSZip.loadAsync(data);
      const resumes = [];
      for (const filename in zip.files) {
        const file = zip.files[filename];
        if (!file.dir && filename.endsWith('.pdf')) {
          const content = await file.async('nodebuffer');
          const data = await pdf(content);
          const savedResume = await processResume(data.text, filename);
          resumes.push(savedResume);
        }
      }
      res.status(201).json({ message: 'Resumes from zip file uploaded, parsed, and embedded successfully', resumes });
    } else {
        res.status(400).json({ message: 'Unsupported file type' });
    }

  } catch (error) {
    console.error('Error in uploadResume:', error);
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
