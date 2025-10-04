# ResumeRAG (Resumé Search & Job Match)

**Think of it as:**  
An AI-based resume search engine + job matcher.

---

## You’ll Build

- **Resume upload** (PDF or ZIP)  
- **Parsing + Embedding** (e.g., using OpenAI Embeddings API or Hugging Face)  
- **Search queries** like “find resumes with React experience”  
- **Job posting → match with uploaded resumes**

---

## What to Code

### 1. `/api/resumes`
- Upload resumes  
- Parse text from PDFs  
- Store extracted text + embeddings  

### 2. `/api/ask`
- Accepts a search query  
- Searches embeddings  
- Returns relevant resume snippets  

### 3. `/api/jobs/:id/match`
- Compares job description vs stored resumes  
- Returns best-matching candidates (based on cosine similarity)

---

## Workflow

1. **Upload resumes** → store text + embeddings  
2. **Upload job** → store job description + embedding  
3. **Ask queries** → semantic search over stored embeddings  
4. **Match** → compare cosine similarity between job and resumes  

---

## Tools & Stack

- **Frontend:** React Js
- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **AI/ML:** OpenAI Embedding API (or Hugging Face) (will discuss this llm thing later)... 


