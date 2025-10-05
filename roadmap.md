### Project Roadmap: ResumeRAG

**Objective:** Build an AI-powered resume search engine and job matching platform.

**Stack:**
*   **Frontend:** React.js
*   **Backend:** Node.js + Express
*   **Database:** MongoDB
*   **AI/ML:** OpenAI Embedding API (or Hugging Face)
*   **Vector Database:** Pinecone

---

### Development Checklist

#### **Phase 1: Project Setup & Backend Foundation**

*   [x] **1. Initialize Project:**
    *   [x] Create `frontend`, `backend`, `ml` directories.
    *   [x] Create `package.json` in `backend` directory.
    *   [x] Install dependencies (`express`, `mongoose`, `multer`, `pdf-parse`, `jszip`, `dotenv`)
    *   [x] Set up `.gitignore` in `backend` directory.
*   [x] **2. Server & Database Setup:**
    *   [x] Create `server.js` in `backend` directory as the main entry point.
    *   [x] Establish a connection to MongoDB.
    *   [x] Create `.env` in `backend` directory for environment variables (`MONGO_URI`, `PORT`).
*   [x] **3. API Structure (MVC in `backend`):**
    *   [x] Create `routes` directory.
    *   [x] Create `controllers` directory.
    *   [x] Create `models` directory.
    *   [x] Create `uploads` directory for storing resumes.

#### **Phase 2: Core Resume Management (Backend)**

*   [x] **1. Resume Model:**
    *   [x] Define `Resume` schema in `backend/models/Resume.js` (e.g., `filename`, `text`, `embedding`, `pii`).
*   [x] **2. Resume Upload (`/api/resumes`):**
    *   [x] Implement file upload logic using `multer`.
    *   [x] Support both PDF and ZIP file uploads.
    *   [x] **Parsing:**
        *   [x] Extract text from PDF files (`pdf-parse`).
        *   [x] Extract files from ZIP archives (`jszip`).
    *   [x] **Embedding (in `ml` module):**
        *   [x] Create a service in the `ml` module to generate embeddings.
    *   [x] **Storage:**
        *   [x] Save the resume file to the `backend/uploads` directory.
        *   [x] Save the extracted text and embeddings to Pinecone.
*   [x] **3. Resume Retrieval (`/api/resumes`):**
    *   [x] Implement `GET /api/resumes` to list all resumes with pagination (`limit`, `offset`).
    *   [ ] Implement `GET /api/resumes?q=` for basic text search.
    *   [x] Implement `GET /api/resumes/:id` to retrieve a single resume.

#### **Phase 3: AI-Powered Search & Matching (Backend & ML)**

*   [x] **1. Semantic Search (`/api/ask`):**
    *   [x] Implement `POST /api/ask` in the backend.
    *   [x] The backend will call the `ml` module to get embeddings for the query.
    *   [x] Perform a vector similarity search against the resume embeddings in Pinecone.
    *   [x] Return the top `k` matching resume snippets.
*   [x] **2. Job & Candidate Matching:**
    *   [x] **Job Model:**
        *   [x] Define `Job` schema in `backend/models/Job.js` (`title`, `description`, `embedding`).
    *   [x] **Job API (`/api/jobs`):**
        *   [x] Implement `POST /api/jobs` to create a new job posting.
        *   [x] Implement `GET /api/jobs` to retrieve all jobs.
        *   [x] Implement `GET /api/jobs/:id` to retrieve a job.
    *   [x] **Matching Logic (`/api/jobs/:id/match`):**
        *   [x] Implement `POST /api/jobs/:id/match`.
        *   [x] The backend will call the `ml` module to get embeddings for the job description.
        *   [x] Compare the job description embedding with all resume embeddings in Pinecone.
        *   [x] Return the `top_n` best-matching candidates.

#### **Phase 4: Frontend Development (`frontend` directory)**

*   [x] **1. Project Setup:**
    *   [x] Set up a new React application (`npx create-react-app frontend`).
*   [x] **2. UI Pages:**
    *   [x] **`/upload`:** A page with a file upload form for resumes.
    *   [x] **`/search`:** A page with a search bar to query resumes (`/api/ask`).
    *   [x] **`/jobs`:** A page to create and view job postings.
    *   [x] **`/candidates/:id`:** A page to view the top candidates for a specific job.
*   [x] **3. API Integration:**
    *   [x] Connect the React components to the backend APIs.
    *   [x] Display data from the APIs in the UI.

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

---

### Extra Features Implemented

*   [x] **Vector Database:** Set up and integrated a Pinecone vector database for storing and searching embeddings.
*   [x] **UI/UX Improvements:**
    *   [x] A modern, translucent navbar.
    *   [x] A consistent background image across all pages.
    *   [x] Improved styling for forms and content boxes.
*   [x] **Code Refactoring:**
    *   [x] Refactored the frontend by merging the `Banner.jsx` component into `Home.jsx`.
    *   [x] Removed unused CSS.
*   [x] **Zip File Upload:** Implemented and fixed the zip file upload functionality to handle multiple resumes.
