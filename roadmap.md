### Project Roadmap: ResumeRAG

**Objective:** Build an AI-powered resume search engine and job matching platform.

**Stack:**
*   **Frontend:** React.js
*   **Backend:** Node.js + Express
*   **Database:** MongoDB
*   **AI/ML:** OpenAI Embedding API (or Hugging Face)

---

### Development Checklist

#### **Phase 1: Project Setup & Backend Foundation**

*   [ ] **1. Initialize Project:**
    *   [x] Create `frontend`, `backend`, `ml` directories.
    *   [x] Create `package.json` in `backend` directory.
    *   [ ] Install dependencies (`express`, `mongoose`, `multer`, `pdf-parse`, `jszip`, `dotenv`)
    *   [ ] Set up `.gitignore` in `backend` directory.
*   [ ] **2. Server & Database Setup:**
    *   [ ] Create `server.js` in `backend` directory as the main entry point.
    *   [ ] Establish a connection to MongoDB.
    *   [ ] Create `.env` in `backend` directory for environment variables (`MONGO_URI`, `PORT`).
*   [ ] **3. API Structure (MVC in `backend`):**
    *   [x] Create `routes` directory.
    *   [x] Create `controllers` directory.
    *   [x] Create `models` directory.
    *   [x] Create `uploads` directory for storing resumes.

#### **Phase 2: Core Resume Management (Backend)**

*   [ ] **1. Resume Model:**
    *   [ ] Define `Resume` schema in `backend/models/Resume.js` (e.g., `filename`, `text`, `embedding`, `pii`).
*   [ ] **2. Resume Upload (`/api/resumes`):**
    *   [ ] Implement file upload logic using `multer`.
    *   [ ] Support both PDF and ZIP file uploads.
    *   [ ] **Parsing:**
        *   [ ] Extract text from PDF files (`pdf-parse`).
        *   [ ] Extract files from ZIP archives (`jszip`).
    *   [ ] **Embedding (in `ml` module):**
        *   [ ] Create a service in the `ml` module to generate embeddings.
    *   [ ] **Storage:**
        *   [ ] Save the resume file to the `backend/uploads` directory.
        *   [ ] Save the extracted text and embeddings to MongoDB.
*   [ ] **3. Resume Retrieval (`/api/resumes`):**
    *   [ ] Implement `GET /api/resumes` to list all resumes with pagination (`limit`, `offset`).
    *   [ ] Implement `GET /api/resumes?q=` for basic text search.
    *   [ ] Implement `GET /api/resumes/:id` to retrieve a single resume.

#### **Phase 3: AI-Powered Search & Matching (Backend & ML)**

*   [ ] **1. Semantic Search (`/api/ask`):**
    *   [ ] Implement `POST /api/ask` in the backend.
    *   [ ] The backend will call the `ml` module to get embeddings for the query.
    *   [ ] Perform a vector similarity search against the resume embeddings in MongoDB.
    *   [ ] Return the top `k` matching resume snippets.
*   [ ] **2. Job & Candidate Matching:**
    *   [ ] **Job Model:**
        *   [ ] Define `Job` schema in `backend/models/Job.js` (`title`, `description`, `embedding`).
    *   [ ] **Job API (`/api/jobs`):**
        *   [ ] Implement `POST /api/jobs` to create a new job posting.
        *   [ ] Implement `GET /api/jobs/:id` to retrieve a job.
    *   [ ] **Matching Logic (`/api/jobs/:id/match`):**
        *   [ ] Implement `POST /api/jobs/:id/match`.
        *   [ ] The backend will call the `ml` module to get embeddings for the job description.
        *   [ ] Compare the job description embedding with all resume embeddings.
        *   [ ] Return the `top_n` best-matching candidates.
        *   [ ] For each match, include evidence (matching snippets) and identify missing requirements.

#### **Phase 4: Frontend Development (`frontend` directory)**

*   [ ] **1. Project Setup:**
    *   [ ] Set up a new React application (`npx create-react-app frontend`).
*   [ ] **2. UI Pages:**
    *   [ ] **`/upload`:** A page with a file upload form for resumes.
    *   [ ] **`/search`:** A page with a search bar to query resumes (`/api/ask`).
    *   [ ] **`/jobs`:** A page to create and view job postings.
    *   [ ] **`/candidates/:id`:** A page to view the top candidates for a specific job.
*   [ ] **3. API Integration:**
    *   [ ] Connect the React components to the backend APIs.
    *   [ ] Display data from the APIs in the UI.

#### **Phase 5: Final Touches & Deployment**

*   [ ] **1. PII Redaction:**
    *   [ ] Implement logic to identify and redact Personally Identifiable Information (PII) from resumes.
    *   [ ] Only show unredacted PII to authorized users (e.g., recruiters).
*   [ ] **2. Deterministic Rankings:**
    *   [ ] Ensure that search and matching results are consistent and reproducible.
*   [ ] **3. Testing:**
    *   [ ] Test all API endpoints.
    *   [ ] Test the frontend components.
*   [ ] **4. Deployment:**
    *   [ ] Prepare the application for deployment.
    *   [ ] Deploy the backend and frontend to a hosting service.