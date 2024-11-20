import { gql } from '@apollo/client';

export const CREATE_TO_DO_ITEM = gql`
  mutation CreateToDoItem($title: String!, $description: String, $status: String) {
    createToDoItem(input: { title: $title, description: $description, status: $status }) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TO_DO_ITEM = gql`
  mutation DeleteToDoItem($id: ID!) {
    deleteToDoItem(input: { id: $id }) {
      id
    }
  }
`;

export const COMPLETE_TO_DO_ITEM = gql`
  mutation CompleteToDoItem($id: ID!) {
    completeToDoItem(input: { id: $id }) {
      id
      status
    }
  }
`;
