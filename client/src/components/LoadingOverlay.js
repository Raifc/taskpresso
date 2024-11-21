import React from 'react';
import { ClipLoader } from 'react-spinners';
import { Overlay } from '../styles/LoadingOverlay.styles';

const LoadingOverlay = ({ loading }) => (
  loading ? (
    <Overlay>
      <ClipLoader color="#90a043" size={80} />
    </Overlay>
  ) : null
);

export default LoadingOverlay;
