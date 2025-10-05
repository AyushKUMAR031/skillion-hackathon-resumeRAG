import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FullResumeModal from './FullResumeModal';
import { toast } from 'react-toastify';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, k: 5 }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      } else {
        console.error('Search failed');
        toast.error('Search failed');
      }
    } catch (error) {
      console.error('Error searching:', error);
      toast.error('Error searching');
    }
  };

  const handleShowModal = async (resumeId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/resumes/${resumeId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedResume(data.text);
        setShowModal(true);
      } else {
        console.error('Failed to fetch resume');
        toast.error('Failed to fetch resume');
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast.error('Error fetching resume');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResume('');
  };

  return (
    <section className="content-section search-section">
      <Container>
        <Row>
          <Col>
            <div className="content-bx search-bx">
              <h2>Search Resumes</h2>
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  placeholder="Type keywords like 'React developer with Python'..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>

              <div className="search-results">
                {results.map((result, index) => (
                  <div key={index} className="search-result-item">
                    <h3>{result.filename}</h3>
                    <p>{result.snippet}</p>
                    <button onClick={() => handleShowModal(result.resume_id)}>View Full Resume</button>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <FullResumeModal show={showModal} handleClose={handleCloseModal} resumeText={selectedResume} />
    </section>
  );
}

export default Search;