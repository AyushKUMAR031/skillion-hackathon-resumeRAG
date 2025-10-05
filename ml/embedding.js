import { pipeline } from '@xenova/transformers';

class EmbeddingService {
  static instance = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    return this.instance;
  }
}

async function generateEmbedding(text) {
  const extractor = await EmbeddingService.getInstance();
  const result = await extractor(text, { pooling: 'mean', normalize: true });
  return Array.from(result.data);
}

module.exports = { generateEmbedding };