# Git Commit History

1. **feat: setup backend MVC structure and dependencies**
    - A	backend/.gitignore
    - A	backend/controllers/resumeController.js
    - A	backend/middleware/upload.js
    - A	backend/models/Resume.js
    - A	backend/package-lock.json
    - A	backend/package.json
    - A	backend/routes/resumes.js

2. **Setup express server and MongoDB connection**
    - A	backend/server.js

3. **Use upload middleware for resume uploads**
    - M	backend/routes/resumes.js

4. **Implement resume parsing and saving to database**
    - M	backend/controllers/resumeController.js

5. **Implement resume retrieval endpoints**
    - M	backend/controllers/resumeController.js
    - M	backend/routes/resumes.js

6. **Add placeholder for semantic search and embedding generation**
    - A	backend/controllers/askController.js
    - A	backend/routes/ask.js
    - M	backend/server.js
    - A	ml/embedding.js

7. **Implement job creation and retrieval endpoints**
    - A	backend/controllers/jobController.js
    - A	backend/models/Job.js
    - A	backend/routes/jobs.js
    - M	backend/server.js

8. **added a readme.md file**
    - A	README.md

9. **Add placeholder for job matching**
    - M	backend/controllers/jobController.js
    - M	backend/routes/jobs.js

10. **Initialize frontend with Vite and React**
    - A	frontend/.gitignore
    - A	frontend/README.md
    - A	frontend/eslint.config.js
    - A	frontend/index.html
    - A	frontend/package-lock.json
    - A	frontend/package.json
    - A	frontend/public/vite.svg
    - A	frontend/src/App.css
    - A	frontend/src/App.jsx
    - A	frontend/src/assets/react.svg
    - A	frontend/src/index.css
    - A	frontend/src/main.jsx
    - A	frontend/vite.config.js

11. **Minimalize frontend app**
    - A	context.md
    - D	frontend/README.md
    - D	frontend/public/vite.svg
    - D	frontend/src/App.css
    - M	frontend/src/App.jsx
    - D	frontend/src/assets/react.svg
    - M	frontend/src/index.css
    - A	roadmap.md

12. **Add FileUpload component**
    - M	frontend/src/App.jsx
    - A	frontend/src/components/FileUpload.jsx

13. **Implement search page and routing**
    - M	frontend/package-lock.json
    - M	frontend/package.json
    - M	frontend/src/App.jsx
    - A	frontend/src/components/Search.jsx

14. **Implement jobs and candidates pages**
    - M	frontend/src/App.jsx
    - A	frontend/src/components/Candidates.jsx
    - A	frontend/src/components/Jobs.jsx