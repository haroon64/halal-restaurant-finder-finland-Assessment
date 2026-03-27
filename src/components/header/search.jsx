// src/components/SearchInput.jsx
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';

export default function SearchInput() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

return (
    <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
            <input
                type="text"
                placeholder="Search restaurants..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <SearchIcon className="search-icon" />
        
        </div>
    </form>
);
}
