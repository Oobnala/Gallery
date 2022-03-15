import React, { useState } from 'react';
import server from '../api/server';

import Search from '../components/search/Search';
import GalleryList from '../components/gallery/GalleryList';
import Overlay from '../components/overlay/Overlay';

const Home = () => {
  const [images, setImages] = useState([]);
  const [showOverlay, setShowOverlay] = useState({ show: false, imgUrl: '' });

  const searchHandler = (searchValue) => {
    console.log(searchValue);

    server
      .get(`photos?query=${searchValue}`)
      .then((res) => {
        console.log(res.data.results);
        setImages(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const overlayHandler = (overlayObject) => {
    setShowOverlay(overlayObject);
  };

  return (
    <div className="home">
      {/* {showOverlay.show && <Overlay imgUrl={showOverlay.imgUrl} />} */}
      <Search search={searchHandler} />
      <GalleryList images={images} overlayHandler={overlayHandler} />
    </div>
  );
};

export default Home;
