import { gql } from '@apollo/client';

export const CREATE_TO_DO_ITEM = gql`
  mutation CreateToDoItem($title: String!, $description: String, $status: String, $dueDate: ISO8601DateTime) {
    createToDoItem(input: { title: $title, description: $description, status: $status, dueDate: $dueDate }) {
      id
      title
      description
      status
      dueDate
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
