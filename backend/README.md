# Med Design Backend API

A professional NestJS backend API for the Med Design website with full CRUD operations, authentication, and admin management.

## Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control** - Admin and user roles
- ✅ **Projects Management** - Create, read, update, and delete projects
- ✅ **Services Management** - Manage services offered
- ✅ **Team Management** - Manage team members
- ✅ **Blog System** - Full-featured blog with drafts and publishing
- ✅ **Contact Messages** - Store and manage contact form submissions
- ✅ **Database Validation** - TypeORM with PostgreSQL
- ✅ **CORS Support** - Configured for frontend integration
- ✅ **Docker Support** - Ready for containerization

## Tech Stack

- **Framework**: NestJS 10
- **Database**: PostgreSQL 16
- **ORM**: TypeORM
- **Authentication**: JWT (Passport.js)
- **Validation**: Class-validator & Class-transformer
- **Runtime**: Node.js 20+
- **Package Manager**: npm

## Prerequisites

- Node.js 20+
- PostgreSQL 12+
- npm or yarn

## Installation

1. **Clone and navigate to backend:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=medesign
PORT=3001
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:5173
```

4. **Create PostgreSQL database:**

```bash
createdb medesign
```

## Running the Application

### Development

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

### Production Build

```bash
npm run build
npm run start:prod
```

### With Docker Compose

```bash
docker-compose up -d
```

## API Endpoints

### Authentication

```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
```

### Projects (Admin Only for Create/Update/Delete)

```
GET    /api/projects          - Get all projects
GET    /api/projects/:id      - Get single project
POST   /api/projects          - Create project
PUT    /api/projects/:id      - Update project
DELETE /api/projects/:id      - Delete project
```

### Services (Admin Only for Create/Update/Delete)

```
GET    /api/services          - Get all services
GET    /api/services/:id      - Get single service
POST   /api/services          - Create service
PUT    /api/services/:id      - Update service
DELETE /api/services/:id      - Delete service
```

### Team (Admin Only for Create/Update/Delete)

```
GET    /api/team              - Get all team members
GET    /api/team/:id          - Get single team member
POST   /api/team              - Create team member
PUT    /api/team/:id          - Update team member
DELETE /api/team/:id          - Delete team member
```

### Blog (Admin Only for Create/Update/Delete)

```
GET    /api/blog              - Get published blog posts
GET    /api/blog/all          - Get all posts (admin only)
GET    /api/blog/:id          - Get post by ID
GET    /api/blog/slug/:slug   - Get post by slug
POST   /api/blog              - Create blog post
PUT    /api/blog/:id          - Update blog post
DELETE /api/blog/:id          - Delete blog post
```

### Contact Messages (Public Create, Admin Only for List/Update)

```
POST   /api/contact           - Submit contact message
GET    /api/contact           - Get all messages (admin only)
GET    /api/contact/:id       - Get single message (admin only)
PATCH  /api/contact/:id/status - Update message status (admin only)
PATCH  /api/contact/:id/respond - Respond to message (admin only)
DELETE /api/contact/:id       - Delete message (admin only)
```

### Health Check

```
GET    /api/health            - Health check
```

## Authentication

Include JWT token in requests:

```bash
Authorization: Bearer <your_jwt_token>
```

## Database Schema

### Entities

- **User** - User accounts with admin flag
- **Project** - Portfolio projects
- **Service** - Services offered
- **TeamMember** - Team member profiles
- **BlogPost** - Blog articles
- **ContactMessage** - Contact form submissions

## Project Structure

```
backend/
├── src/
│   ├── auth/                 # Authentication logic
│   ├── common/               # Guards, decorators, utilities
│   ├── database/             # Database configuration
│   ├── dto/                  # Data transfer objects
│   ├── entities/             # TypeORM entities
│   ├── modules/              # Feature modules
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── projects/
│   │   ├── services/
│   │   └── team/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/                     # Test files
├── .env.example              # Environment template
├── Dockerfile                # Docker image
├── docker-compose.yml        # Docker Compose config
├── package.json
├── tsconfig.json
└── README.md
```

## Development Commands

```bash
# Start development server with hot reload
npm run start:dev

# Build for production
npm run build

# Run production build
npm run start:prod

# Lint code
npm run lint

# Format code
npm run format

# Run tests
npm run test

# Run test with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## Database Migrations

The application uses TypeORM with automatic schema sync in development. For production, use migrations:

```bash
# Generate migration from entity changes
npm run migration:generate -- src/database/migrations/InitialMigration

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files. Use `.env.local` for local development
2. **JWT Secret**: Change `JWT_SECRET` in production to a strong, random value
3. **CORS**: Configure `CORS_ORIGIN` to your frontend domain
4. **Database**: Always use strong passwords in production
5. **Rate Limiting**: Consider adding rate limiting for production deployment

## Troubleshooting

### Database Connection Error

```
Ensure PostgreSQL is running and credentials in .env are correct:
- Check DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD
```

### Port Already in Use

```
Change PORT in .env or kill process using port 3001:
lsof -i :3001
kill -9 <PID>
```

### JWT Token Expired

```
Increase JWT_EXPIRATION in .env
Currently set to 7d (7 days)
```

## Support

For issues or questions, please check the documentation or create an issue.

## License

UNLICENSED - Internal Use Only
