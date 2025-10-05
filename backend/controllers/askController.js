const { initPinecone } = require('../pinecone');

exports.ask = async (req, res) => {
  try {
    const { generateEmbedding } = await import('../../ml/embedding.js');
    const { query, k } = req.body;
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const queryEmbedding = await generateEmbedding(query);
    const pineconeIndex = await initPinecone();

    const queryRequest = {
      vector: queryEmbedding,
      topK: 50, // Get more results to group from
      includeMetadata: true,
    };

    const queryResponse = await pineconeIndex.query(queryRequest);

    const candidates = queryResponse.matches.reduce((acc, match) => {
        const { resume_id, text, filename } = match.metadata;
        const { score } = match;

        if (!acc[resume_id] || score > acc[resume_id].score) {
            acc[resume_id] = {
                resume_id,
                score,
                snippet: text,
                filename,
            };
        }
        return acc;
    }, {});

    const results = Object.values(candidates)
        .sort((a, b) => b.score - a.score)
        .slice(0, k || 5);


    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
