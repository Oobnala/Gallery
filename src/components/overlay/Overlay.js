import { useState } from 'react';
import ReactDOM from 'react-dom';
import LoadingSpinner from '../loading/LoadingSpinner';

/* 
  A React Portal overlay that is displayed over the entire site
  with an image that was clicked on by the user. The loading spinner
  will show while the image is being loaded.
*/
const Overlay = ({ imgUrl, overlayHandler }) => {
  const [isLoadingImage, setLoadingImage] = useState(true);

  return ReactDOM.createPortal(
    <>
      <div
        onClick={() => {
          overlayHandler({ show: false, imgUrl: '' });
        }}
        className="overlay"
      >
        <img
          className="overlay__img"
          src={imgUrl}
          alt=""
          onLoad={() => setLoadingImage(false)}
          style={!isLoadingImage ? {} : { display: 'none' }}
        />
        <div className="overlay__spinner">
          <LoadingSpinner isLoading={isLoadingImage} />
        </div>
      </div>
    </>,
    document.getElementById('overlay')
  );
};

export default Overlay;
