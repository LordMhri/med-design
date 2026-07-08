# 🚀 Med Design Backend - START HERE

Welcome! Your complete NestJS backend has been created. This file will guide you through everything.

## 📋 Quick Navigation

### 🏃 I want to run it NOW (5 minutes)
→ Go to [QUICKSTART.md](./QUICKSTART.md)

### 📖 I want to understand it first
→ Read [README.md](./README.md)

### 🔌 I want to see all API endpoints
→ Check [API_SPEC.md](./API_SPEC.md)

### 🗄️ I need help with the database
→ See [SETUP_DATABASE.md](./SETUP_DATABASE.md)

### 🚢 I'm ready to deploy
→ Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

### 📂 I want to understand the file structure
→ Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

### ✅ What was created for me?
→ See [INSTALLATION_SUMMARY.md](./INSTALLATION_SUMMARY.md)

---

## ⚡ The Fastest Path (Really 5 Minutes)

### For Local Development:

```bash
# 1. Install dependencies (2 min)
npm install

# 2. Copy environment config (10 sec)
cp .env.example .env.local

# 3. Start the backend (30 sec)
npm run start:dev
```

Done! Your API is running at `http://localhost:3001/api`

### For Docker (Even Easier):

```bash
# 1. Start everything (1 min)
docker-compose up -d

# 2. Check it's working
curl http://localhost:3001/api/health
```

Done! Database + API are running!

---

## 🎯 What You Have

### Backend Features
✅ JWT Authentication (login/register)  
✅ 6 Modules (Projects, Services, Team, Blog, Contact, Admin)  
✅ PostgreSQL Database  
✅ 40+ API Endpoints  
✅ Admin Role Management  
✅ Full CRUD Operations  

### Code Quality
✅ TypeScript for type safety  
✅ ESLint + Prettier for code style  
✅ Jest for testing  
✅ CORS enabled for frontend  

### Deployment Ready
✅ Docker image included  
✅ docker-compose setup  
✅ Environment configuration  
✅ Production deployment guide  

---

## 🚦 Next Steps

### Step 1: Get It Running
Choose your setup:
- **Local**: See [QUICKSTART.md](./QUICKSTART.md) Option 1
- **Docker**: See [QUICKSTART.md](./QUICKSTART.md) Option 2

### Step 2: Verify It Works
```bash
# Test the health endpoint
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-06-15T10:30:00Z"
}
```

### Step 3: Create Your First User
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

### Step 4: Explore the API
- Read [API_SPEC.md](./API_SPEC.md) for all endpoints
- Try making requests with your JWT token
- Check the database with `psql`

### Step 5: Connect Your Frontend
Update your frontend's API base URL:
```javascript
const API_URL = 'http://localhost:3001/api'
```

---

## 📁 Project Structure at a Glance

```
backend/
├── src/
│   ├── auth/              ← Login & register
│   ├── modules/           ← Features (Projects, Blog, etc)
│   ├── entities/          ← Database tables
│   ├── dto/               ← Validation rules
│   └── main.ts            ← Entry point
├── .env.example           ← Environment template
├── docker-compose.yml     ← Run with Docker
├── package.json           ← Dependencies
└── [Documentation files]  ← Guides
```

For detailed structure: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

---

## 🔑 Key Endpoints

| Endpoint | Method | What it does |
|----------|--------|-------------|
| `/api/health` | GET | Check if API is running |
| `/api/auth/register` | POST | Create new user |
| `/api/auth/login` | POST | Login user |
| `/api/projects` | GET/POST | Manage projects |
| `/api/services` | GET/POST | Manage services |
| `/api/team` | GET/POST | Manage team |
| `/api/blog` | GET/POST | Manage blog posts |
| `/api/contact` | POST/GET | Contact messages |

See [API_SPEC.md](./API_SPEC.md) for complete list.

---

## 🔧 Available Commands

```bash
npm run start:dev      # Start with hot reload
npm run build          # Build for production
npm run start:prod     # Run production build
npm run test           # Run tests
npm run lint           # Check code quality
npm run format         # Format code automatically
```

---

## 💾 Database

### Local PostgreSQL
- Host: `localhost`
- Port: `5432`
- Database: `medesign`
- Username: `postgres`
- Password: `postgres`

### With Docker
Database is created automatically when you run:
```bash
docker-compose up -d
```

### View Database
```bash
psql -U postgres -d medesign
\dt              # List tables
SELECT * FROM projects;  # Query data
\q               # Exit
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Complete guide with all details |
| **QUICKSTART.md** | Get running in 5 minutes |
| **API_SPEC.md** | All endpoints with examples |
| **SETUP_DATABASE.md** | Database setup & troubleshooting |
| **DEPLOYMENT.md** | Deploy to production |
| **PROJECT_STRUCTURE.md** | Understand the code organization |
| **INSTALLATION_SUMMARY.md** | What was created |

---

## ❓ Troubleshooting

### Backend won't start?
- Check PostgreSQL is running
- Verify `.env.local` has correct credentials
- See [SETUP_DATABASE.md](./SETUP_DATABASE.md)

### Port already in use?
```bash
lsof -i :3001  # Find process
kill -9 <PID>  # Kill it
```

### Database connection error?
- Create database: `createdb medesign`
- Check credentials in `.env.local`
- See [SETUP_DATABASE.md](./SETUP_DATABASE.md)

### More help?
- Read the relevant documentation file above
- Check [QUICKSTART.md](./QUICKSTART.md) troubleshooting section

---

## 🎉 You're Ready!

Everything you need is here. Choose your path above and get started! 

Questions? Check the documentation files or see [README.md](./README.md) for comprehensive help.

---

## 📞 Quick Reference

**Default Ports:**
- Backend API: `3001`
- PostgreSQL: `5432`
- Frontend: `5173` (if using Vite)

**API Base URL:**
- Development: `http://localhost:3001/api`
- Production: `https://api.medesign.example.com`

**JWT Token:**
- Location: `Authorization: Bearer <token>`
- Expiration: 7 days (configurable)
- Secret: Change in `.env` for production

---

Happy coding! 🚀
