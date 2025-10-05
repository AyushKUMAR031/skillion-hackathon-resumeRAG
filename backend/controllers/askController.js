const { generateEmbedding } = require('../../ml/embedding');
const { initPinecone } = require('../pinecone');

exports.ask = async (req, res) => {
  try {
    const { query, k } = req.body;
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const queryEmbedding = await generateEmbedding(query);
    const pineconeIndex = await initPinecone();

    const queryRequest = {
      vector: queryEmbedding,
      topK: k || 5,
      includeMetadata: true,
    };

    const queryResponse = await pineconeIndex.query(queryRequest);

    const results = queryResponse.matches.map(match => ({
        resume_id: match.metadata.resume_id,
        snippet: match.metadata.text,
        score: match.score,
    }));


    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
