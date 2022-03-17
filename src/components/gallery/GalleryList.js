import GalleryCard from './GalleryCard';
import ErrorMessage from '../error/ErrorMessage';

/* 
  GalleryList maps through the images array sent from Unsplash and
  displays them as GalleryCard components. If images are empty after
  a request, displays an error message to the user.
*/
const GalleryList = ({ images, overlayHandler, initialRender }) => {
  return (
    <div className="gallery-list">
      {images.length !== 0
        ? images.map((image) => {
            return (
              <GalleryCard
                key={image.id}
                image={image}
                overlayHandler={overlayHandler}
              />
            );
          })
        : !initialRender && <ErrorMessage message="No images found" />}
    </div>
  );
};

export default GalleryList;
