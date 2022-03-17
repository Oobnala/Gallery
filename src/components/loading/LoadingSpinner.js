import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

/* 
  A third party react spinner for when images are loading in the gallery
  and the overlay image.
*/
const LoadingSpinnner = ({ isLoading }) => {
  return (
    <div className="loading-spinner">
      <BeatLoader
        color="#ff005d"
        loading={isLoading}
        css={override}
        size={30}
      />
    </div>
  );
};

export default LoadingSpinnner;
