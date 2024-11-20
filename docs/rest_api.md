## Rest Endpoints

### Get All To-Do Items

**URL**: `/to_do_items`

**Method**: GET

**Query Parameters**:

`page`(optional): Page number.

`per_page`(optional): Number of items per page.

**Response Example**:
```json
{
  "to_do_items": [
    {
      "id": 1,
      "title": "Sample Task",
      "description": "This is a sample task.",
      "status": "pending",
      "due_date": "2024-11-25",
      "created_at": "2024-11-20",
      "updated_at": "2024-11-20",
      "formatted_due_date": "November 25, 2024"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 1,
    "total_count": 1
  }
}
```

### Create a To-Do Item

**URL**: `/to_do_items`

**Method**: POST

**Body**:

```json
{
	"title": "New Task",
	"description": "Task description",
	"status": "pending",
	"due_date": "2025-02-02"
}
```

**Response Example**:

```json
{
  "id": 2,
  "title": "New Task",
  "description": "Details about the task",
  "status": "pending",
  "due_date": "2024-12-01",
  "created_at": "2024-11-20",
  "updated_at": "2024-11-20",
  "formatted_due_date": "December 01, 2024"
}
```

### Update a To-Do Item

**URL**: `/to_do_items/:id`

**Method**: PUT

**Body**:
```json
{
  "title": "Edited task"
}
```

**Response Example**
```json
{
  "id": 1,
  "title": "Sample Task",
  "description": "This is a sample task.",
  "status": "complete",
  "due_date": "2024-11-25",
  "created_at": "2024-11-20",
  "updated_at": "2024-11-20",
  "formatted_due_date": "November 25, 2024"
}
```

### Filter To-Do Items by Status

**URL**: `/to_do_items/filter_by_status`

**Method**: GET

**Query Parameters**:

`status`: Filter by pending or complete.

**Response Example**: Same as "Get All To-Do Items" but with status filtered.

### Mark To-Do Item as Complete

URL: `/to_do_items/:id/complete`

Method: PUT

Response Example: Same as "Update a To-Do Item"