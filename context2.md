### **the updated context :**
- **Parse + chunk resumes (backend) — idea**
    - Break each document into pages and then into chunks of ~400–800 tokens (or ~1000 characters) so embeddings capture local context. Store chunk text, resume_id, page, and chunk_index.
    - Why: gives you exact snippet evidence and page references for judge checks.

- **Embedding service (ml/embedding.js) — idea**
    - Centralize one service that takes text and returns the embedding vector.
    - Keep the model name/config in env vars.

- **Where to store embeddings — approach**
    - Small scale/hackathon: store chunk vectors inside MongoDB as an array on each chunk doc, then compute cosine similarity in Node for each query. Simple, no infra.
    - Better/fast option: upsert embeddings to a vector DB (Pinecone / Chroma / Weaviate). This gives fast nearest neighbour search.
    - `I prefer to see the vector DB thing.`

    - **Example: Pinecone (pseudo)**
        ```js
            // use Pinecone client (see Pinecone docs)
            await pinecone.index("resumes").upsert({
            vectors: [{ id: chunkId, values: embedding, metadata: { resumeId, page, textPreview } }]
            });
            const queryRes = await pinecone.index("resumes").query({ vector: queryEmbedding, topK: 10, includeMetadata: true });
        ```
- **`/api/ask` and `/api/jobs/:id/match` — idea**
    - `/api/ask {query,k}:` embed query, query vector store for top-k chunks, return list of {resume_id, chunk_text, page, score}.
    - `/api/jobs/:id/match {top_n}:` embed job description, query for top resumes; additionally compute missing requirements by matching job-required skill tokens against resume text (simple string match + fuzzy match).
    
    - Important: return snippet evidence and page references to satisfy judge checks.

- ***Deterministic rankings — idea***
    - To make rankings reproducible: sort by (score descending, then chunk.createdAt ascending, then resumeId lexicographic). This breaks ties deterministically.
    - Why: Vector search can return ties; judge expects deterministic results.

- **PII redaction — idea**
    - Use a two step approach:
        - First run deterministic regex redactors for structured PII: emails, phones, SSNs, national ids. Replace with [REDACTED_EMAIL] etc.
        - For names or contextual PII use NER (spaCy) or a small NER model to identify PERSON entities, or call an LLM to redact. For hackathon, regex + a small name list + an allowlist approach is fine. Medium+1

- **Practical pattern (server side):**
    ```js
        function redactPII(text) {
            text = text.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, "[REDACTED_EMAIL]");
            text = text.replace(/(\+?\d{1,3})?[\s\-.(]*\d{3}[\s\-.)]*\d{3}[\s\-]*\d{4}/g, "[REDACTED_PHONE]");
            // Add more rules or use a library
            return text;
        }
    - Store both redacted_text and raw_text in DB but only return raw_text to recruiter role. Keep access control strict.

- **Idempotency & Rate limiting**
    - Idempotency: Accept Idempotency-Key header on create POSTs. Store the key with the original request hash and the saved response. If the same key repeats, return stored response. This prevents duplicate uploads.

    - Rate limiting: Use express-rate-limit configured to 60 req/min and return 429 { "error": { "code":"RATE_LIMIT" } } when exceeded.

    - Example (express-rate-limit):
        ```js
            import rateLimit from 'express-rate-limit';
            app.use('/api', rateLimit({
            windowMs: 60*1000,
            max: 60,
            keyGenerator: (req) => req.user?.id || req.ip,
            handler: (req, res) => res.status(429).json({ error: { code: "RATE_LIMIT" } })
            }));
        ```
    - Idempotency sketch:   
        ```js
            // on POST create
            const key = req.header('Idempotency-Key');
            if (key) {
            const existing = await Idempotency.findOne({ key });
            if (existing) return res.status(200).json(existing.response);
            // else process and save response under key
            }
        ```

- **Snippets and page refs (judge requirement)**
    - Save chunk metadata (resumeId, chunkIndex, page, charStart, charEnd, shortPreview). Return these fields in /ask and /match responses so judge can validate snippet evidence.