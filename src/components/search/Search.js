import React from 'react';

const Search = ({ search, setSearchTerm, searchVal }) => {
  return (
    <div className="search">
      <input
        className="search__input"
        placeholder="Search image..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchVal}
      />
      <button className="search__btn" onClick={() => search()}>
        Search
      </button>
    </div>
  );
};

export default Search;
