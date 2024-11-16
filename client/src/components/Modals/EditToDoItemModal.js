import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';

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

const ModalBody = styled.form`
  padding: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #90a043;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #393f1b;
  }
`;

const EditToDoItemModal = ({ isOpen, onRequestClose, item, refreshToDoItems }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [status, setStatus] = useState(item.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`api/v1/to_do_items/${item.id}`, {
        to_do_item: { title, description, status },
      });
      refreshToDoItems();
      onRequestClose();
    } catch (error) {
      console.error('Error updating to-do item:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <ModalHeader>
        <h2>Edit To-Do Item</h2>
        <CloseButton onClick={onRequestClose}>&times;</CloseButton>
      </ModalHeader>
      <ModalBody onSubmit={handleSubmit}>
        <Label>
          Title:
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Label>
        <Label>
          Description:
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Label>
        <Label>
          Status:
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </Select>
        </Label>
        <ButtonContainer>
          <SubmitButton type="submit">Update</SubmitButton>
        </ButtonContainer>
      </ModalBody>
    </Modal>
  );
};

export default EditToDoItemModal;
