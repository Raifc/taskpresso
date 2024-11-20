import { gql } from '@apollo/client';

export const GET_TO_DO_ITEMS = gql`
  query GetToDoItems($status: String, $page: Int, $perPage: Int) {
    filterToDoItemsByStatus(status: $status, page: $page, perPage: $perPage) {
      toDoItems {
        id
        title
        description
        status
        dueDate
        createdAt
        updatedAt
      }
      currentPage
      nextPage
      prevPage
      totalPages
      totalCount
    }
  }
`;
