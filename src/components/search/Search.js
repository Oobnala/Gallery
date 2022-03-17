import React, { useState } from 'react';
import server from '../../api/server';
import { spellChecker } from './spellchecker';

/* 
  Search is a component that includes the search input field and search button.
  Before the get request is sent to Unsplash to retrieve images, the search value
  will run through the spell check first and will be corrected if necessary.
*/
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

      // send request for images
      await server
        .get(`photos?query=${correctedWord}`)
        .then((res) => {
          setInitialRender(false);
          setImages(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
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
