# Quick Start Guide

Get the Med Design backend running in 5 minutes!

## Option 1: Local Setup (Recommended for Development)

### Prerequisites
- Node.js 20+ installed
- PostgreSQL installed and running

### Steps

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env.local
```

4. **Create PostgreSQL database:**
```bash
# Using psql
psql -U postgres
CREATE DATABASE medesign;
\q
```

5. **Start development server:**
```bash
npm run start:dev
```

6. **Verify it's running:**
```bash
curl http://localhost:3001/api/health
```

You should see:
```json
{
  "status": "ok",
  "timestamp": "2024-06-15T10:30:00.000Z"
}
```

---

## Option 2: Docker Setup (Recommended for Production)

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create environment file (optional):**
```bash
cp .env.example .env.local
```

3. **Start with Docker Compose:**
```bash
docker-compose up -d
```

4. **Check logs:**
```bash
docker-compose logs -f backend
```

5. **Verify it's running:**
```bash
curl http://localhost:3001/api/health
```

6. **Stop containers:**
```bash
docker-compose down
```

---

## First API Call

### Test Authentication

**Register a new admin user:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "firstName": "Admin",
    "lastName": "User",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin@example.com",
    "firstName": "Admin",
    "lastName": "User",
    "isAdmin": false
  }
}
```

> **Note:** The first user created won't be admin by default. To make a user admin, you need database access or use a seeding script.

### Make an Admin API Call

**Get all projects:**
```bash
curl http://localhost:3001/api/projects
```

This works without authentication.

**Create a project (requires admin token):**
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Project",
    "description": "This is my first project",
    "image": "https://example.com/image.jpg",
    "tags": ["web", "design"]
  }'
```

---

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3001
lsof -i :3001
kill -9 <PID>
```

### Database Connection Error

```
Check .env.local:
- DB_HOST should be 'localhost' for local PostgreSQL
- DB_HOST should be 'postgres' for Docker
- Ensure PostgreSQL is running
```

### Dependencies Installation Error

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules
npm install
```

### Docker Issues

```bash
# View container logs
docker-compose logs backend

# Rebuild containers
docker-compose down
docker-compose up -d --build
```

---

## Next Steps

1. **Read API Documentation**: Check [API_SPEC.md](./API_SPEC.md)
2. **Explore Project Structure**: Read [README.md](./README.md)
3. **Connect Frontend**: Update your frontend to use `http://localhost:3001/api`
4. **Setup Admin User**: Contact database admin to set `isAdmin = true`
5. **Configure Environment**: Update `.env.local` with your settings

---

## Development Tips

### Hot Module Reloading
Development server automatically reloads on file changes:
```bash
npm run start:dev
```

### View Database
Connect to PostgreSQL:
```bash
psql -U postgres -d medesign
```

### Run Tests
```bash
npm run test              # Run all tests
npm run test:watch       # Run in watch mode
npm run test:cov         # With coverage report
```

### Format Code
```bash
npm run format  # Auto-format with Prettier
npm run lint    # Run ESLint
```

---

## API Base URL
- **Local**: `http://localhost:3001/api`
- **Docker**: `http://localhost:3001/api`

## Support
For detailed information, see the main [README.md](./README.md)
