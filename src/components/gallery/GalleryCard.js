const GalleryCard = ({ image, overlayHandler }) => {
  return (
    <div
      className="gallery-card"
      key={image.id}
      onClick={() => {
        overlayHandler({ show: true, imgUrl: image.urls.full });
      }}
    >
      <img
        className="gallery-card__img"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={image.urls.full}
        alt=""
      />
      <div className="gallery-card__overlay"></div>
    </div>
  );
};

export default GalleryCard;
