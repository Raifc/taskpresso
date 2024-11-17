import React, { useState } from 'react';
import axios from 'axios';
import { TitleWrapper, Title, Header, Wrapper, FormContainer, Form } from '../shared/StyledComponents';

const CreateToDoItemForm = ({ onItemCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('api/v1/to_do_items', {
        to_do_item: { title, description, due_date: dueDate, status: 'pending' },
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      onItemCreated();
    } catch (error) {
      console.error('Error creating to-do item:', error);
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <Header>
          <TitleWrapper>
            <Title>Create To-Do Item</Title>
          </TitleWrapper>
        </Header>
        <Form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
          <label>Description:</label>
          <textarea
            value={description}
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
          <label>Due Date:</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="submit">Create To-Do Item</button>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default CreateToDoItemForm;
