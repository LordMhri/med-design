# Backend Project Structure

Complete NestJS backend project for Med Design website.

## Directory Structure

```
backend/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts         # Auth endpoints (login, register)
│   │   ├── auth.module.ts             # Auth module configuration
│   │   ├── auth.service.ts            # Authentication business logic
│   │   └── jwt.strategy.ts            # JWT token validation strategy
│   │
│   ├── common/
│   │   └── guards/
│   │       ├── admin.guard.ts         # Admin role protection
│   │       └── jwt.guard.ts           # JWT authentication guard
│   │
│   ├── database/
│   │   └── ormconfig.ts               # TypeORM database configuration
│   │
│   ├── dto/                           # Data Transfer Objects
│   │   ├── auth.dto.ts                # Login/Register DTOs
│   │   ├── create-contact.dto.ts      # Contact form DTO
│   │   ├── create-project.dto.ts      # Project creation DTO
│   │   └── create-service.dto.ts      # Service creation DTO
│   │
│   ├── entities/                      # Database entities
│   │   ├── blog-post.entity.ts        # Blog posts table
│   │   ├── contact-message.entity.ts  # Contact messages table
│   │   ├── project.entity.ts          # Projects table
│   │   ├── service.entity.ts          # Services table
│   │   ├── team-member.entity.ts      # Team members table
│   │   └── user.entity.ts             # Users table
│   │
│   ├── modules/                       # Feature modules
│   │   ├── blog/
│   │   │   ├── blog.controller.ts
│   │   │   ├── blog.module.ts
│   │   │   └── blog.service.ts
│   │   │
│   │   ├── contact/
│   │   │   ├── contact.controller.ts
│   │   │   ├── contact.module.ts
│   │   │   └── contact.service.ts
│   │   │
│   │   ├── projects/
│   │   │   ├── projects.controller.ts
│   │   │   ├── projects.module.ts
│   │   │   └── projects.service.ts
│   │   │
│   │   ├── services/
│   │   │   ├── services.controller.ts
│   │   │   ├── services.module.ts
│   │   │   └── services.service.ts
│   │   │
│   │   └── team/
│   │       ├── team.controller.ts
│   │       ├── team.module.ts
│   │       └── team.service.ts
│   │
│   ├── app.controller.spec.ts         # App controller tests
│   ├── app.controller.ts              # Health check endpoint
│   ├── app.module.ts                  # Main app module
│   ├── app.service.ts                 # Main app service
│   └── main.ts                        # Application entry point
│
├── test/
│   └── jest-e2e.json                  # E2E test configuration
│
├── .dockerignore                       # Docker ignore file
├── .env.example                        # Environment template
├── .eslintignore                       # ESLint ignore patterns
├── .eslintrc.js                        # ESLint configuration
├── .gitignore                          # Git ignore patterns
├── .prettierrc                         # Prettier code formatting
├── API_SPEC.md                         # Complete API documentation
├── Dockerfile                          # Docker image definition
├── README.md                           # Main documentation
├── SETUP_DATABASE.md                   # Database setup guide
├── QUICKSTART.md                       # Quick start guide
├── PROJECT_STRUCTURE.md                # This file
├── docker-compose.yml                  # Docker compose configuration
├── jest.config.js                      # Jest testing configuration
├── package.json                        # Dependencies and scripts
└── tsconfig.json                       # TypeScript configuration
```

## Key Files Explanation

### Configuration Files

- **tsconfig.json** - TypeScript compiler options
- **package.json** - Project dependencies and npm scripts
- **jest.config.js** - Testing framework configuration
- **.env.example** - Environment variables template
- **.eslintrc.js** - Code linting rules
- **.prettierrc** - Code formatting rules
- **Dockerfile** - Container image definition
- **docker-compose.yml** - Multi-container orchestration

### Source Code Structure

#### Authentication (src/auth/)
Handles user registration, login, and JWT token management.

#### Database (src/database/)
TypeORM configuration connecting to PostgreSQL.

#### Entities (src/entities/)
TypeORM entities defining database table schemas.

#### DTOs (src/dto/)
Data Transfer Objects for request/response validation.

#### Modules (src/modules/)
Feature-specific modules with controllers and services:
- **Projects** - Portfolio projects management
- **Services** - Services offered management
- **Team** - Team members management
- **Blog** - Blog posts with drafts and publishing
- **Contact** - Contact form submissions

#### Guards (src/common/guards/)
Middleware for protecting routes with JWT and Admin checks.

## Module Architecture

Each module follows NestJS best practices:

```
module/
├── [feature].controller.ts    # Routes and request handling
├── [feature].service.ts       # Business logic
└── [feature].module.ts        # Module configuration
```

### Controller → Service Pattern

Controllers handle HTTP requests and delegate to services for business logic.

```
HTTP Request
    ↓
Controller (validates input)
    ↓
Service (performs action)
    ↓
Repository (database access)
    ↓
Response
```

## Database Schema

### Tables

1. **users** - User accounts
   - id, email, password, firstName, lastName, isAdmin, timestamps

2. **projects** - Portfolio projects
   - id, title, description, image, tags, link, details, challenge, solution, results, images, timestamps

3. **services** - Services offered
   - id, name, description, icon, image, features, price, isActive, timestamps

4. **team_members** - Team member profiles
   - id, name, position, bio, image, email, expertise, social URLs, timestamps

5. **blog_posts** - Blog articles
   - id, title, content, excerpt, slug, image, tags, status, views, timestamps, publishedAt

6. **contact_messages** - Contact submissions
   - id, name, email, phone, message, interests, budget, referralSource, status, response, timestamps, userId

## Dependencies

### Core
- `@nestjs/core` - NestJS framework
- `@nestjs/platform-express` - Express adapter
- `@nestjs/typeorm` - TypeORM integration
- `typeorm` - ORM for database
- `pg` - PostgreSQL driver

### Authentication
- `@nestjs/jwt` - JWT handling
- `@nestjs/passport` - Passport authentication
- `passport-jwt` - JWT strategy
- `bcrypt` - Password hashing

### Validation
- `class-validator` - Request validation
- `class-transformer` - DTO transformation

### Development
- `@nestjs/cli` - NestJS CLI tools
- `@nestjs/testing` - Testing utilities
- `jest` - Testing framework
- `ts-jest` - TypeScript Jest support
- `eslint` - Code linting
- `prettier` - Code formatting

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=medesign

# Server
PORT=3001
NODE_ENV=development

# Authentication
JWT_SECRET=your_secret_key
JWT_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

## Scripts

```bash
npm run start:dev      # Development with hot reload
npm run build          # Build for production
npm run start:prod     # Run production build
npm run test           # Run tests
npm run test:watch     # Watch mode testing
npm run lint           # Lint code
npm run format         # Format code with Prettier
```

## API Endpoints Overview

- **Auth** - `/api/auth/*`
- **Projects** - `/api/projects/*`
- **Services** - `/api/services/*`
- **Team** - `/api/team/*`
- **Blog** - `/api/blog/*`
- **Contact** - `/api/contact/*`
- **Health** - `/api/health`

## Documentation Files

- **README.md** - Main documentation with setup and usage
- **QUICKSTART.md** - Get running in 5 minutes
- **API_SPEC.md** - Complete API endpoint documentation
- **SETUP_DATABASE.md** - Database setup and troubleshooting
- **PROJECT_STRUCTURE.md** - This file

## Getting Started

1. Install dependencies: `npm install`
2. Setup database: Follow `SETUP_DATABASE.md`
3. Configure `.env.local` file
4. Start development: `npm run start:dev`
5. Read `API_SPEC.md` for API documentation

---

For more details, see the main [README.md](./README.md)
