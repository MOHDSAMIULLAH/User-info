import React from 'react'
import './SearchHistory.css'

function SearchHistory({searchHistory}) {
    return (
      <div className='search-container'>
        <h2>Search History</h2>
        <p>past search term:</p>
        <div className="list">
        <ul>
          {searchHistory.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
        </div>
      </div>
    );
  };
  

export default SearchHistory;