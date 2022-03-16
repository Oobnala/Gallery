import React, { useState } from 'react';
import server from '../api/server';
import words from '../assets/words.json';

import Search from '../components/search/Search';
import GalleryList from '../components/gallery/GalleryList';
import Overlay from '../components/overlay/Overlay';

const Home = () => {
  const [searchVal, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [showOverlay, setShowOverlay] = useState({ show: false, imgUrl: '' });

  const searchHandler = async () => {
    let formattedWord = searchVal.toLowerCase().replace(/[^a-z]/g, '');
    let correctedWord = spellChecker(formattedWord);

    console.log(searchVal);
    console.log(correctedWord);

    if (!correctedWord) {
      correctedWord = searchVal;
    }

    setSearchTerm(correctedWord);
    await server
      .get(`photos?query=${correctedWord}`)
      .then((res) => {
        console.log(res.data.results);
        setImages(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const spellChecker = (searchVal) => {
    if (words.hasOwnProperty(searchVal)) {
      return searchVal;
    }

    let result = [];
    let firstChar = searchVal[0];
    let noVowelsSearch = searchVal.replace(/[aeiou]/g, '*');

    let res = Object.keys(words).filter(
      (v) => v.length === searchVal.length && v.startsWith(firstChar)
    );

    for (let word of res) {
      let noVowelsWord = word.replace(/[aeiou]/g, '*');

      if (noVowelsSearch === noVowelsWord) {
        result.push(word);
      }
    }

    return result[0];
  };

  const overlayHandler = (overlayObject) => {
    setShowOverlay(overlayObject);
  };

  return (
    <div className="home">
      {showOverlay.show && (
        <Overlay imgUrl={showOverlay.imgUrl} overlayHandler={overlayHandler} />
      )}
      <Search
        search={searchHandler}
        setSearchTerm={setSearchTerm}
        searchVal={searchVal}
      />
      <GalleryList images={images} overlayHandler={overlayHandler} />
    </div>
  );
};

export default Home;
