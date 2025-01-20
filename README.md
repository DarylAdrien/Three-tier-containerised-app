# Three-tier-containerised-app

This repository contains a containerized Django and React application designed as a three-tier architecture. The project uses Docker Compose to manage services and employs a custom bridge network for communication between the frontend and backend. The backend uses Django's built-in SQLite3 database with persistent storage enabled via Docker volumes.

---

### Features

- **Frontend**: React application served on port `5173`.
- **Backend**: Django application served on port `8000`, using SQLite3 for the database.
- **Custom Bridge Network**: Enables seamless communication between the frontend and backend.
- **Persistent Storage**: Uses Docker volumes to store SQLite3 database data, ensuring data persists across container restarts.

---

## Prerequisites

- Docker: Ensure Docker is installed and running on your machine.
- Docker Compose: Ensure you have Docker Compose installed.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Three-tier-containerised-app.git
cd Three-tier-containerised-app
```

### 2. Build and Start Containers

Use Docker Compose to build and start the application:

```bash
docker-compose up --build
```

### 3. Access the Application

    Frontend: Visit http://localhost:5173 in your browser.
    Backend: Visit http://localhost:8000.

### 4. Stopping the Application

To stop and remove containers, networks, and volumes:

```bash
docker-compose down
```

## Docker Configuration

### Frontend
  
  - Built from the ./frontend directory using its Dockerfile.
  - Exposed on port 5173.

### Backend

  - Built from the ./backend directory using its Dockerfile.
  - Exposed on port 8000.
  - Uses backend_db_volume to store SQLite3 database data persistently at /app/db.

### Custom Bridge Network

  - A custom bridge network named fullstack facilitates communication between the frontend and backend services.

### Persistent Storage

  - The SQLite3 database data is stored persistently using a named volume:

        volumes:
          backend_db_volume:

    This ensures database data is retained even if the backend container is stopped or removed.


---

## License

This project is licensed under the MIT License.
