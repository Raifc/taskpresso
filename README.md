# Taskpresso
Taskpresso is a Rails/React monorepo that serves as a to-do application. The backend API, built with Rails, and includes both REST and GraphQL endpoints. The frontend is a React application located in the `client/` directory.

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

2. Install Dependencies for the Client Service (important for the React frontend): Run the following command to ensure all Node.js dependencies are installed:
```bash
docker-compose run --rm client npm install
```

3. Prepare the Database (for the Rails API): Run the following commands to create and seed the database:
```bash
docker-compose run --rm api rails db:create db:migrate db:seed
```

4. Run the following command to build and start the application:
```bash
docker-compose up
```
This command will start the React Server on the port 3000 and Rails server on the port 3001. 

## Running Tests
### RSpec tests
With the container up, run the RSpec tests for the Rails API:

```bash
docker-compose exec api bash -c "RAILS_ENV=test rspec"
```

### Cypress tests
To run the end-to-end (E2E) Cypress tests, please ensure you have the following prerequisites installed:

- Node.js 19.x
- Ruby 3.2.2
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

3. Install Bundler
Install Bundler to manage Ruby gem dependencies:
```bash
gem install bundler
```

4. Install Ruby Gems
Navigate to the project's root directory and install the required gems:
```bash
bundle install
```

5. Run Cypress Tests:
In a new terminal window, run the Cypress tests with the following command:

```bash
npm run e2e:tests
```

### Troubleshooting: 
Access-Related Issues (File Permissions): If you encounter access-related issues (e.g., permission denied errors) using Linux, this might be due to file or directory ownership in the Docker environment. Resolve it by adjusting ownership using the following command inside the project's directory:
```bash
sudo chown -R $USER:$USER .
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