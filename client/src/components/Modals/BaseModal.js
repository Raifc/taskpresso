import React from 'react';
import Modal from 'react-modal';
import { ModalHeader, CloseButton, ModalBody } from '../../shared/StyledComponents';

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

const BaseModal = ({ isOpen, onRequestClose, title, children }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
    <ModalHeader>
      <h2>{title}</h2>
      <CloseButton onClick={onRequestClose}>&times;</CloseButton>
    </ModalHeader>
    <ModalBody>{children}</ModalBody>
  </Modal>
);

export default BaseModal;
