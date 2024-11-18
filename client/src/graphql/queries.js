import { gql } from '@apollo/client';

export const GET_TO_DO_ITEMS = gql`
  query GetToDoItems($status: String) {
    filterToDoItemsByStatus(status: $status) {
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
