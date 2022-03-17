/* 
  GalleryCard includes an image from the images array sent from Unsplash.
  On hover, the GalleryCard will have an overlay with the username who posted
  the photo. When a user clicks on a GalleryCard, it will trigger an overlay
  of the entire photo.
*/
const GalleryCard = ({ image, overlayHandler }) => {
  return (
    <div
      className="gallery-card"
      key={image.id}
      onClick={() => {
        overlayHandler({
          show: true,
          imgUrl: image.urls.full,
          user: image.user.username,
        });
      }}
    >
      <img
        className="gallery-card__img"
        src={image.urls.regular}
        alt={image.alt_description}
      />
      <div className="gallery-card__overlay">
        <div className="gallery-card__user-container">
          <h6>Photo by</h6>
          <h6 className="gallery-card__username">{image.user.username}</h6>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
