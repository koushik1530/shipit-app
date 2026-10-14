# ShipIt

A task app built as a DevOps capstone project. Phase 1 covers containerizing the app with Docker and Docker Compose.

## What's inside

| Service  | Technology          | Port | Purpose                                  |
|----------|---------------------|------|------------------------------------------|
| db       | PostgreSQL 16       | 5432 | Stores tasks in the `pgdata` volume      |
| api      | Node.js + Express   | 3000 | REST API: `/health`, `/tasks`            |
| frontend | React + Vite, Nginx | 8080 | Task list UI served by Nginx             |

## Requirements

- Docker Desktop with WSL 2 integration (Windows) or Docker Engine (Linux)
- Git

## Run locally

1. Create a `.env` file in the project root (it is not committed to Git):

```
   POSTGRES_USER=shipit
   POSTGRES_PASSWORD=shipit
   POSTGRES_DB=shipit
```

2. Start the stack:

```bash
   docker compose up --build
```

3. Open http://localhost:8080 in your browser.

## Useful commands

```bash
docker compose ps          # show running services
docker compose logs api    # view API logs
docker compose down        # stop the stack (data is kept)
docker compose down -v     # stop and delete the database volume
```

## API endpoints

| Method | Path     | Description                     |
|--------|----------|---------------------------------|
| GET    | /health  | Health check                    |
| GET    | /tasks   | List all tasks                  |
| POST   | /tasks   | Create a task (`{"title": "..."}`) |

## Project structure

```
shipit-app/
├── api/              Express API and its Dockerfile
├── frontend/         React app and its Dockerfile
├── docker-compose.yml
└── README.md
```
