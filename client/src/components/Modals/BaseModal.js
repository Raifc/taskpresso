import React from 'react';
import Modal from 'react-modal';
import { ModalHeader, ModalBody, CloseButton } from '../../styles/BaseModal.styles';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '0',
    border: 'none',
    borderRadius: '12px',
    maxHeight: '65vh',
    overflow: 'hidden',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)',
  },
};

const BaseModal = ({ isOpen, onRequestClose, title, children }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
    <ModalHeader>
      <h2>{title}</h2>
      <CloseButton data-testid="modal-close-button" onClick={onRequestClose}>&times;</CloseButton>
    </ModalHeader>
    <ModalBody>{children}</ModalBody>
  </Modal>
);

export default BaseModal;
