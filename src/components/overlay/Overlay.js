import ReactDOM from 'react-dom';

const Overlay = ({ imgUrl }) => {
  return ReactDOM.createPortal(
    <>
      <div className="overlay" />
      <img className="overlay__img" src={imgUrl} alt="" />
    </>,
    document.getElementById('overlay')
  );
};

export default Overlay;
