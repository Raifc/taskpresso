import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TO_DO_ITEM } from '../graphql/mutations';
import { GET_TO_DO_ITEMS } from '../graphql/queries';
import { Wrapper, FormContainer, Form } from '../styles/CreateToDoItemForm.styles'
import { Input, TextArea, SubmitButton, Header, TitleWrapper, Title } from '../styles/sharedStyles';

const CreateToDoItemForm = ({ onItemCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
          <SubmitButton type="submit">Create To-Do Item</SubmitButton>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default CreateToDoItemForm;
