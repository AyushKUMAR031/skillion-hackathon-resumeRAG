## Problem Statement
### **ResumeRAG** (Resume Search & Job Match)

**Objective:** Upload multiple resumés, parse + embed, answer queries with snippet evidence, and match against job descriptions.

**Must-Have Pages:** `/upload`, `/search`, `/jobs`, `/candidates/:id`

**Key APIs:**

- `POST /api/resumes` (multipart upload)
- `GET /api/resumes?limit=&offset=&q=`
- `GET /api/resumes/:id`
- `POST /api/ask {query,k}`
- `POST /api/jobs`, `GET /api/jobs/:id`
- `POST /api/jobs/:id/match {top_n}`

**Constraints:** deterministic rankings, redact PII unless recruiter, ZIP bulk upload support.

**Judge Checks:** 3+ uploads processed; `/ask` returns schema-compliant answers; `/match` returns evidence and missing requirements; pagination correct.

