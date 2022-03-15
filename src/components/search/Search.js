import React, { useState } from 'react';

const Search = (props) => {
  const [searchValue, setSearchTerm] = useState('');

  return (
    <div className="search">
      <input
        className="search__input"
        placeholder="Search image..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search__btn" onClick={() => props.search(searchValue)}>
        Search
      </button>
    </div>
  );
};

export default Search;
