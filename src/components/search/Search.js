import React, { useState } from 'react';
import server from '../../api/server';
import { spellChecker } from './spellchecker';

const Search = ({ setImages, setInitialRender, setError, setLoading }) => {
  const [searchVal, setSearchTerm] = useState('');
  const [inputError, setInputError] = useState(false);

  const searchHandler = async () => {
    // set searchVal to lowercase and remove all characters that are not a-z
    let formattedWord = searchVal.toLowerCase().replace(/[^a-z]/g, '');

    setError(false);

    if (formattedWord === '') {
      setInputError(true);
    } else {
      // send the formatted searh value to the spell checker
      let correctedWord = spellChecker(formattedWord);

      // if the corrected word is undefined, set it to the original searchVal
      if (!correctedWord) {
        correctedWord = searchVal;
      }

      // reset the search term in the input field to the corrected word
      setSearchTerm(correctedWord);
      setLoading(true);

      // Send a get request with the correctWord value
      try {
        const response = await server.get(`photos?query=${correctedWord}`);
        const imageResults = response.data.results;

        setInitialRender(false);
        setLoading(false);
        // If successful, store the image data with the setImages prop
        setImages(imageResults);
      } catch (err) {
        // Display error message if a server error occured
        setLoading(false);
        setError(true);
      }
    }
  };

  // Error messages to show when search input is empty
  // or not a valid word like '123456' or '!@#$%'
  const errorMessage = () => {
    if (searchVal === '') {
      return 'Please enter a word to search.';
    } else {
      return 'Please enter a valid word to search.';
    }
  };

  return (
    <div className="search">
      <div className="search__container">
        <div className="search__input-container">
          <input
            className="search__input"
            placeholder="Search image..."
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setInputError(false)}
            value={searchVal}
          />
          {inputError && <p className="search__error">{errorMessage()}</p>}
        </div>
        <button className="search__btn" onClick={() => searchHandler()}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
