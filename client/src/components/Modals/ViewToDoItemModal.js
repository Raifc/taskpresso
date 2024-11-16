import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '0',
    border: 'none',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
  },
};

const ModalHeader = styled.div`
  background-color: #90a043;
  padding: 16px;
  color: #fff;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-top: 0;
  color: #fff;
`;

const Description = styled.p`
  margin-top: 10px;
`;

const Status = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;

const ViewToDoItemModal = ({ isOpen, onRequestClose, item }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <ModalHeader>
        <Title>{item.title}</Title>
        <CloseButton onClick={onRequestClose}>&times;</CloseButton>
      </ModalHeader>
      <ModalBody>
        <Description>{item.description}</Description>
        <Status>Status: {item.status}</Status>
      </ModalBody>
    </Modal>
  );
};

export default ViewToDoItemModal;
