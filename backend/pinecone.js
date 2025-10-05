require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');

const pinecone = new Pinecone({
environment: process.env.PINECONE_ENVIRONMENT,
apiKey: process.env.PINECONE_API_KEY,
});

async function initPinecone() {
const indexName = 'resumes';
const existingIndexes = await pinecone.listIndexes();
if (!existingIndexes.includes(indexName)) {
    await pinecone.createIndex({
    name: indexName,
    dimension: 384, // This should match the dimension of your embedding model
    metric: 'cosine',
    });
    console.log(`Created index: ${indexName}`);
} else {
    console.log(`Index already exists: ${indexName}`);
}
return pinecone.Index(indexName);
}

module.exports = { initPinecone };
