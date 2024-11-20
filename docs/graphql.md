## Base URL
`/graphql`

## Queries and Mutations
### Get all To-Do Items
```graphql
query GetAllToDoItems($page: Int, $perPage: Int) {
  toDoItems(page: $page, perPage: $perPage) {
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
    totalPages
    totalCount
  }
}
```
**Variables**:
```json
{
  "page": 1,
  "perPage": 10
}
```

**Response**
```json
{
  "data": {
    "toDoItems": {
      "toDoItems": [
        {
          "id": "1",
          "title": "Sample Task",
          "description": "This is a sample task.",
          "status": "pending",
          "dueDate": "2024-11-25",
          "createdAt": "2024-11-20",
          "updatedAt": "2024-11-20"
        }
      ],
      "currentPage": 1,
      "totalPages": 1,
      "totalCount": 1
    }
  }
}
```

### Filter To-Do Items by Status
```graphql
query FilterToDoItemsByStatus($status: String, $page: Int, $perPage: Int) {
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
    totalPages
    totalCount
  }
}
```

**Variables**:
```json
{
  "status": "pending",
  "page": 1,
  "perPage": 10
}
```

**Response**
```json
{
  "data": {
    "filterToDoItemsByStatus": {
      "toDoItems": [
        {
          "id": "1",
          "title": "Sample Task",
          "description": "This is a sample task.",
          "status": "pending",
          "dueDate": "2024-11-25",
          "createdAt": "2024-11-20",
          "updatedAt": "2024-11-20"
        }
      ],
      "currentPage": 1,
      "totalPages": 1,
      "totalCount": 1
    }
  }
}
```

### Create To-Do Item
```graphql
mutation CreateToDoItem($input: CreateToDoItemInput!) {
  createToDoItem(input: $input) {
    id
    title
    description
    status
    dueDate
    createdAt
    updatedAt
  }
}
```

**Variables**:
```json
{
  "input": {
    "title": "New Task",
    "description": "Details about the task",
    "status": "pending",
    "dueDate": "2024-12-01"
  }
}
```

**Response**
```json
{
  "data": {
    "createToDoItem": {
      "id": "2",
      "title": "New Task",
      "description": "Details about the task",
      "status": "pending",
      "dueDate": "2024-12-01",
      "createdAt": "2024-11-20",
      "updatedAt": "2024-11-20"
    }
  }
}
```

###  Mark To-Do Item as Complete

```graphql
mutation CompleteToDoItem($input: CompleteToDoItemInput!) {
  completeToDoItem(input: $input) {
    id
    title
    description
    status
    dueDate
    createdAt
    updatedAt
  }
}
```
**Variables**:
```json
{
  "input": {
    "id": "1"
  }
}
```
**Response**: (Same structure as above, status will be complete)

### Delete To-Do Item
```graphql
mutation DeleteToDoItem($input: DeleteToDoItemInput!) {
  deleteToDoItem(input: $input) {
    id
    title
  }
}
```

**Variables**:
```json
{
  "input": {
    "id": "1"
  }
}
```

**Response**:
```json
{
  "data": {
    "deleteToDoItem": {
      "id": "1",
      "title": "Sample Task"
    }
  }
}
```