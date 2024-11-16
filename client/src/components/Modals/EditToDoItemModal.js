import React, { useState } from 'react';
import axios from 'axios';
import BaseModal from './BaseModal';
import { Label, Input, TextArea, Select, ButtonContainer, SubmitButton } from '../../shared/StyledComponents';

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
      <form onSubmit={handleSubmit}>
        <Label>
          Title:
        </Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Label>
          Description:
        </Label>
          <TextArea value={description} rows={5} onChange={(e) => setDescription(e.target.value)} />
        <Label>
          Status:
        </Label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </Select>
        <ButtonContainer>
          <SubmitButton type="submit">Update</SubmitButton>
        </ButtonContainer>
      </form>
    </BaseModal>
  );
};

export default EditToDoItemModal;
