import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

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
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
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
                    <h3>{result.resume_id}</h3>
                    <p>{result.snippet}</p>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Search;
