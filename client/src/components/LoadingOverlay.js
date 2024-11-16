import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const LoadingOverlay = ({ loading }) => (
  loading ? (
    <Overlay>
      <ClipLoader color="#90a043" size={80} />
    </Overlay>
  ) : null
);

export default LoadingOverlay;
