exports.generateEmbedding = async (text) => {
  // Placeholder for embedding generation
  console.log(`Generating embedding for: ${text.substring(0, 50)}...`);
  return Array.from({length: 1536}, () => Math.random());
};
