import React, { useState } from 'react';
import Search from '../components/search/Search';
import GalleryList from '../components/gallery/GalleryList';
import Overlay from '../components/overlay/Overlay';
import ErrorMessage from '../components/error/ErrorMessage';
import LoadingSpinnner from '../components/loading/LoadingSpinner';

const Home = () => {
  const [initialRender, setInitialRender] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState({
    show: false,
    imgUrl: '',
  });

  // Used to trigger image overlay with imgUrl
  const overlayHandler = (overlayObject) => {
    setShowOverlay(overlayObject);
  };

  return (
    <div className="home">
      {/* Overlay will show when a gallery card is clicked */}
      {showOverlay.show && (
        <Overlay imgUrl={showOverlay.imgUrl} overlayHandler={overlayHandler} />
      )}
      <Search
        setImages={setImages}
        setInitialRender={setInitialRender}
        setError={setError}
        setLoading={setLoading}
      />
      <LoadingSpinnner isLoading={isLoading} />

      {/* Only display the Gallery if there are no errors and loading is finished */}
      {!error && !isLoading && (
        <GalleryList
          initialRender={initialRender}
          images={images}
          overlayHandler={overlayHandler}
        />
      )}

      {/* Display an error message if a server error occured */}
      {error && !isLoading && (
        <ErrorMessage message="A server error has occcured." />
      )}
    </div>
  );
};

export default Home;
