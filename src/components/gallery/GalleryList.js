import GalleryCard from './GalleryCard';

const GalleryList = ({ images, overlayHandler }) => {
  return (
    <div className="gallery-list">
      {images.map((image) => {
        return (
          <GalleryCard
            key={image.id}
            image={image}
            overlayHandler={overlayHandler}
          />
        );
      })}
    </div>
  );
};

export default GalleryList;
