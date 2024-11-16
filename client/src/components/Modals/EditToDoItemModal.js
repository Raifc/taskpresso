import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    maxWidth: '500px',
    margin: 'auto',
  },
};

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
  }

  input,
  textarea,
  select {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  button {
    padding: 10px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }
  }
`;

const EditToDoItemModal = ({ isOpen, onRequestClose, item, refreshToDoItems }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [status, setStatus] = useState(item.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/to_do_items/${item.id}`, {
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
      <h2>Edit To-Do Item</h2>
      <Form onSubmit={handleSubmit}>
        <label>
          Title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
        </label>
        <button type="submit">Update</button>
      </Form>
    </Modal>
  );
};

export default EditToDoItemModal;
