import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { TitleWrapper, Title, Header } from '../shared/StyledComponents';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const FormContainer = styled.div`
  width: 90%; 
  max-width: 1100px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
  }

  input,
  textarea,
  select,
  button {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    background-color: #90a043;
    margin-top: 15px;
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #393f1b;
    }
  }
`;

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
          <label>
            Title:
          </label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          <label>
            Description:
          </label>
            <textarea value={description} rows={10} onChange={(e) => setDescription(e.target.value)} />
          <label>
            Due Date:
          </label>
            <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <button type="submit">Create To-Do Item</button>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default CreateToDoItemForm;
