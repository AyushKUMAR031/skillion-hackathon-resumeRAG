exports.ask = async (req, res) => {
  try {
    const { query, k } = req.body;
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Placeholder for semantic search
    const results = [
      { resume_id: 'dummy_id_1', snippet: 'This is a dummy snippet for React experience.' },
      { resume_id: 'dummy_id_2', snippet: 'Another dummy snippet for Node.js experience.' },
    ];

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
