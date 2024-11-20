### Running Without Docker
If you’d like to run Taskpresso without Docker, you can follow the instructions below. However, for easier setup and hot-reloading, you may choose to adjust the docker-compose configuration to run in development mode, as described at the end.

Prerequisites
- Ruby: Version 3.2.2 (use a version manager like rbenv or rvm)
- Node.js: Version 18
- PostgreSQL: Ensure PostgreSQL is installed and running
- Setup Instructions

1. Install Backend Dependencies: In the project root, install Rails dependencies:

```bash
bundle install
```

2. Set Up the Database: Create and migrate the database:

```bash
rails db:create db:migrate
```
3. Seed the database (optional)
```bash
rails db:seed
```

4. Install Frontend Dependencies: Navigate to the client directory to install dependencies:

```bash
cd client
npm install
```
5. Start the React Frontend: Start the React app with hot-reloading:

```bash
npm start
This will start the app on http://localhost:3000.
```

6. Start the Rails Backend: In the root directory, start the Rails server:

```bash
rails s
```

The Rails API will be available at http://localhost:3001.

7. Access the Application: Visit http://localhost:3000 in your browser to use Taskpresso. The frontend will proxy API requests to http://localhost:3001