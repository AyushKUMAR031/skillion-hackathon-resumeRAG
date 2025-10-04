const Resume = require('../models/Resume');
const pdf = require('pdf-parse');
const fs = require('fs');
const JSZip = require('jszip');

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
      text: text,
    });

    const savedResume = await newResume.save();

    res.status(201).json({ message: 'Resume uploaded and parsed successfully', resume: savedResume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
