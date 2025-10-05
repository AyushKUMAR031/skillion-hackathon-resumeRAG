require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

async function initPinecone() {
  const indexName = 'resumes';
  const existingIndexes = await pinecone.listIndexes();
  if (!existingIndexes.indexes.map(i => i.name).includes(indexName)) {
    await pinecone.createIndex({
      name: indexName,
      dimension: 384, // This should match the dimension of your embedding model
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
      waitUntilReady: true,
    });
    console.log(`Created index: ${indexName}`);
  } else {
    console.log(`Index already exists: ${indexName}`);
  }
  return pinecone.Index(indexName);
}

module.exports = { initPinecone };