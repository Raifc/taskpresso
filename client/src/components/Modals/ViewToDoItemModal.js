import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    maxWidth: '500px',
    margin: 'auto',
  },
};

const CloseButton = styled.button`
  float: right;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ViewToDoItemModal = ({ isOpen, onRequestClose, item }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <CloseButton onClick={onRequestClose}>&times;</CloseButton>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>Status: {item.status}</p>
    </Modal>
  );
};

export default ViewToDoItemModal;
