import React, { useState } from 'react';
import { spellChecker } from './spellchecker';

// Unsplash search url
const url = 'https://api.unsplash.com/search';

const Search = ({ setImages, setInitialRender, setError, setLoading }) => {
  const [searchVal, setSearchTerm] = useState('');
  const [inputError, setInputError] = useState(false);

  const searchHandler = () => {
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
      fetch(`${url}/photos?query=${correctedWord}`, {
        method: 'GET',
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_CLIENT_ID}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          // Display error message if a server error occured
          if (!res.ok) {
            setLoading(false);
            setError(true);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          const imageResults = data.results;

          setInitialRender(false);
          setLoading(false);
          // If successful, store the image data with the setImages prop
          setImages(imageResults);
        })
        .catch((err) => {
          console.log(err);
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
