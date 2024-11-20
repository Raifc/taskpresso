# Taskpresso
Taskpresso is a Rails/React monorepo that serves as a to-do application. The backend API, built with Rails, and includes both REST and GraphQL endpoints. The frontend is a React application located in the `client/` directory, built as static files and served by Rails.

## Technology Stack

- **Backend**: Rails 7.2.5, Ruby 3.2.2
- **Frontend**: React (inside the `client/` directory)
- **Containerization**: Docker, docker-compose

## Directory Structure

Below is the structure of the repository:

```plaintext
taskpresso/
├── app/                   # Main Rails API application folder
│   ├── controllers/       # Rails controllers
│   ├── graphql/           # GraphQL
│   ├── models/            # Rails models
│   └── ...
│
├── client/                # React frontend app
│   ├── public/            # Public assets
│   ├── src/               # Source code
│   └── package.json       # Dependencies
│
├── config/                # Rails configuration files
├── db/                    # Database migrations and seeds
├── spec/                  # RSpec tests
├── Dockerfile             # Multi-stage Dockerfile for building React and Rails
└── docker-compose.yml     # Docker Compose configuration
```
## Prerequisites
 - Docker and Docker Compose

## Getting Started
To get Taskpresso running locally, ensure you have Docker and Docker Compose installed. To run without Docker, see the [Running without Docker](docs/running_without_docker.md) doc.

## Development Setup
1. Clone this repository.

1. Navigate to the root directory of the repository.

3. Run the following command to build and start the application:

```bash
docker-compose up --build
```
This command will start the React Server on the port 3000 and Rails server on the port 3001. 

## Database Setup
The Rails API uses PostgreSQL. Migrations will run automatically when the application is started in Docker. However, if you need to run them manually, use the following command:

```bash
docker-compose exec api bash -c "rails db:create db:migrate"
```

You can also seed initial data by running:

```bash
docker-compose exec api bash -c "rails db:seed"
```

## Running Tests
### RSpec tests
To run the RSpec tests for the Rails API:

```bash
docker-compose exec api bash -c "RAILS_ENV=test rspec"
```

### Cypress tests
To run the end-to-end (E2E) Cypress tests, please ensure you have the following prerequisites installed:

- Node.js 19.x
- Rails 7.2.5

**Steps**
1. Ensure no instances are running:
If any Docker instances are currently running, bring them down to start with a clean setup:

```bash
docker-compose down
```

2. Start the Database:
Start only the database service with Docker:

```bash
docker-compose up db
```

3. Run Cypress Tests:
In a new terminal window, run the Cypress tests with the following command:

```bash
npm run e2e:tests
```

## Additional Commands
#### To stop the application, use:

```bash
docker-compose down
```

## API Documentation
### REST API
For detailed documentation about the REST API, including endpoints, request examples, and responses, refer to [REST API Documentation](docs/rest_api.md/).

### GraphQL API
For detailed documentation about the GraphQL API, including queries, mutations, and examples, refer to [GraphQL API Documentation](docs/graphql.md).

## Deployment Notes
The Taskpresso monorepo is structured to deploy a Rails + React application seamlessly. For deployment, the Rails application serves React as static files. This is achieved by building the React frontend and copying the resulting static files into the Rails public/ folder. Here’s how it works:

**1. Build React Static Files:** Run the npm run build command in the client directory. This creates a production-ready build of the React application in the client/build folder.

**2. Copy Static Files:** The contents of the client/build folder (including index.html, JavaScript, CSS, and other static assets) are copied to the Rails app's public/ directory.
Rails Serves React:

During deployment, Rails uses its public/ folder to serve these static files. The index.html serves as the entry point for React, allowing the frontend to handle routing and UI rendering.
API Integration:

The React frontend communicates with the Rails backend through API endpoints (both REST and GraphQL).