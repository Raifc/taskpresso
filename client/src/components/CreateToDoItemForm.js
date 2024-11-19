import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TO_DO_ITEM } from '../graphql/mutations';
import { GET_TO_DO_ITEMS } from '../graphql/queries';
import { Wrapper, FormContainer, Header, TitleWrapper, Title, Form, Input, TextArea, SubmitButton } from '../shared/StyledComponents';

const CreateToDoItemForm = ({ onItemCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [createToDoItem] = useMutation(CREATE_TO_DO_ITEM, {
    update(cache, { data: { createToDoItem } }) {
      const existingItems = cache.readQuery({ query: GET_TO_DO_ITEMS, variables: { status: null } });

      if (existingItems && createToDoItem) {
        cache.writeQuery({
          query: GET_TO_DO_ITEMS,
          variables: { status: null },
          data: {
            filterToDoItemsByStatus: [createToDoItem, ...existingItems.filterToDoItemsByStatus],
          },
        });
      }
    },
    onCompleted: () => {
      setTitle('');
      setDescription('');
      setDueDate('');
      onItemCreated();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createToDoItem({
        variables: {
          title,
          description,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
          status: 'pending',
        },
      });
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
          <Input
            id="todo-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
            data-cy="todo-title-input"
          />
          <label>Description:</label>
          <TextArea
            id="todo-description"
            value={description}
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            data-cy="todo-description-input"
          />
          <label>Due Date:</label>
          <Input
            id="todo-due-date"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <SubmitButton type="submit">Create To-Do Item</SubmitButton>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default CreateToDoItemForm;
