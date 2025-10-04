import React, { useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
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
    <div>
      <h2>Search Resumes</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.resume_id}</h3>
            <p>{result.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
