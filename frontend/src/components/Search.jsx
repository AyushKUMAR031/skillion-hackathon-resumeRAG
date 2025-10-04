import React, { useState } from 'react';
import { RiSearch2Line, RiCloseLine } from 'react-icons/ri';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
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

  const toggleSearch = (e) => {
    e.preventDefault();
    setShowSearch(!showSearch);
  };

  return (
    <div className="container">
      <h2>Search Resumes</h2>
      <form className={`search ${showSearch ? 'show-search' : ''}`} onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Type something..."
          className="search__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="search__button" onClick={toggleSearch}>
          {showSearch ? (
            <RiCloseLine className="ri-close-line search__close" />
          ) : (
            <RiSearch2Line className="ri-search-2-line search__icon" />
          )}
        </div>
      </form>

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
