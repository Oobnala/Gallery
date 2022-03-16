import ReactDOM from 'react-dom';

const Overlay = ({ imgUrl, overlayHandler }) => {
  return ReactDOM.createPortal(
    <>
      {/* <div className="overlay" /> */}
      <div
        onClick={() => {
          overlayHandler({ show: false, imgUrl: '' });
        }}
        className="overlay"
      >
        <img src={imgUrl} alt="" />
      </div>
    </>,
    document.getElementById('overlay')
  );
};

export default Overlay;
