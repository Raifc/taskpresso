import React, { useState } from 'react';
import axios from 'axios';
import BaseModal from './BaseModal';
import { Select, ButtonContainer } from '../../styles/EditToDoItemModal.styles'
import { Label, Input, TextArea, SubmitButton } from '../../styles/sharedStyles';

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
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose} title="Edit To-Do Item">
      <form onSubmit={handleSubmit} id="edit-todo-modal">
        <Label htmlFor="edit-todo-title">Title</Label>
        <Input
          id="edit-todo-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          data-cy="edit-todo-title-input"
        />
  
        <Label htmlFor="edit-todo-description">Description</Label>
        <TextArea
          id="edit-todo-description"
          value={description}
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
        />
  
        <Label htmlFor="edit-todo-status">Status</Label>
        <Select
          id="edit-todo-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="complete">Complete</option>
        </Select>
  
        <ButtonContainer>
          <SubmitButton type="submit" id="submit-edit">Update</SubmitButton>
        </ButtonContainer>
      </form>
    </BaseModal>
  );
};

export default EditToDoItemModal;
