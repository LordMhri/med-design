# Deployment Guide

Guide for deploying the Med Design backend to production.

## Pre-Deployment Checklist

- [ ] All tests passing (`npm run test`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Environment variables configured
- [ ] Database backups in place
- [ ] JWT_SECRET changed to strong value
- [ ] CORS_ORIGIN updated to production domain
- [ ] Database optimized and indexed

## Production Environment Variables

Create `.env` (not `.env.local`) with production values:

```env
# Database (Production PostgreSQL)
DB_HOST=prod-db.example.com
DB_PORT=5432
DB_USERNAME=prod_user
DB_PASSWORD=strong_random_password_here
DB_DATABASE=medesign_prod

# Server
PORT=3001
NODE_ENV=production

# JWT - MUST CHANGE IN PRODUCTION
JWT_SECRET=generate_strong_random_key_minimum_32_chars
JWT_EXPIRATION=7d

# CORS - Update to your domain
CORS_ORIGIN=https://medesign.example.com,https://www.medesign.example.com

# Email (Optional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=app_password
```

Generate strong JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Deployment Options

### Option 1: Docker on VPS/Cloud

#### Build Docker Image

```bash
# Build the image
docker build -t medesign-backend:latest .

# Tag for registry (e.g., Docker Hub)
docker tag medesign-backend:latest yourregistry/medesign-backend:latest

# Push to registry
docker push yourregistry/medesign-backend:latest
```

#### Deploy with Docker Compose

Update `docker-compose.yml` for production:

```yaml
version: '3.9'

services:
  postgres:
    image: postgres:16-alpine
    container_name: medesign-postgres
    environment:
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_DATABASE}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U ${DB_USERNAME}']
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: yourregistry/medesign-backend:latest
    container_name: medesign-backend
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: ${DB_USERNAME}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_DATABASE: ${DB_DATABASE}
      NODE_ENV: production
      PORT: 3001
      JWT_SECRET: ${JWT_SECRET}
      JWT_EXPIRATION: ${JWT_EXPIRATION}
      CORS_ORIGIN: ${CORS_ORIGIN}
    ports:
      - '3001:3001'
    depends_on:
      postgres:
        condition: service_healthy
    restart: always
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3001/api/health']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  postgres_data:
```

Deploy:
```bash
docker-compose -f docker-compose.yml up -d
```

### Option 2: Traditional Node.js Server

#### 1. Install Node.js
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. Clone Repository
```bash
cd /opt
git clone <your-repo>
cd medesign/backend
```

#### 3. Install Dependencies
```bash
npm install --omit=dev
```

#### 4. Build Application
```bash
npm run build
```

#### 5. Setup PM2 for Process Management
```bash
sudo npm install -g pm2

# Start application
pm2 start dist/main.js --name "medesign-backend"

# Auto-start on reboot
pm2 startup
pm2 save
```

#### 6. Setup Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name api.medesign.example.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.medesign.example.com;

    # SSL Certificate
    ssl_certificate /etc/letsencrypt/live/api.medesign.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.medesign.example.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Option 3: Heroku

#### 1. Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

#### 2. Login and Create App
```bash
heroku login
heroku create medesign-backend
```

#### 3. Add PostgreSQL
```bash
heroku addons:create heroku-postgresql:standard-0
```

#### 4. Set Environment Variables
```bash
heroku config:set JWT_SECRET=your_strong_secret
heroku config:set CORS_ORIGIN=https://medesign.example.com
```

#### 5. Deploy
```bash
git push heroku main
```

### Option 4: AWS EC2 + RDS

#### 1. Create EC2 Instance
- Launch t3.medium instance
- Use Ubuntu 22.04 LTS
- Open ports 22, 80, 443, 3001

#### 2. Install Dependencies
```bash
sudo apt update
sudo apt install -y nodejs npm nginx git curl
```

#### 3. Create RDS PostgreSQL Database
- Engine: PostgreSQL 16
- Instance class: db.t3.micro (free tier)
- Allocated storage: 20 GB
- Public accessibility: No (unless necessary)

#### 4. Clone and Deploy
```bash
cd /opt
git clone <your-repo>
cd medesign/backend

# Install and build
npm install --omit=dev
npm run build

# Setup PM2
sudo npm install -g pm2
pm2 start dist/main.js
pm2 startup
pm2 save
```

#### 5. Configure Nginx
See "Traditional Node.js Server" section above

#### 6. SSL Certificate (Let's Encrypt)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d api.medesign.example.com
```

## Database Migration

### Backup Production Database
```bash
# Dump database
pg_dump -U prod_user -h prod-db.example.com medesign_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# Upload to secure storage
```

### Update Schema
```bash
# In development, update entities
# In production, run:
npm run migration:run
```

## Monitoring & Logging

### Application Logs
```bash
# With PM2
pm2 logs medesign-backend

# With Docker
docker-compose logs -f backend
```

### Monitor Performance
```bash
# With PM2
pm2 monit

# Check Node.js process
ps aux | grep node
```

### Database Monitoring
```bash
# Connect to production database
psql -U prod_user -h prod-db.example.com -d medesign_prod

# Check connections
SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;

# Check slow queries
SELECT query, calls, mean_time FROM pg_stat_statements ORDER BY mean_time DESC;
```

## Security Hardening

### 1. Database Security
```sql
-- Restrict user permissions
REVOKE ALL ON DATABASE medesign_prod FROM postgres;
GRANT CONNECT ON DATABASE medesign_prod TO prod_user;
GRANT USAGE ON SCHEMA public TO prod_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO prod_user;
```

### 2. Firewall Rules
```bash
# Allow only necessary ports
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
```

### 3. SSL/TLS Certificate
```bash
# Use Let's Encrypt (free)
sudo certbot certonly --standalone -d api.medesign.example.com

# Auto-renew
sudo systemctl enable certbot.timer
```

### 4. Rate Limiting
Add to code:
```bash
npm install @nestjs/throttler
```

Configure in `app.module.ts`:
```typescript
import { ThrottlerModule } from '@nestjs/throttler';

ThrottlerModule.forRoot({
  ttl: 60,
  limit: 10,
}),
```

## Performance Optimization

### 1. Database Optimization
```sql
-- Create indexes
CREATE INDEX idx_projects_created ON projects(created_at);
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_status ON blog_posts(status);
CREATE INDEX idx_contact_status ON contact_messages(status);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM projects WHERE id = '...';
```

### 2. Caching
Add Redis:
```bash
npm install @nestjs/cache-manager redis
```

### 3. Load Balancing
Setup multiple instances behind load balancer (Nginx, AWS ALB)

## Monitoring Dashboards

### Setup Monitoring
- Use PM2 Plus for application monitoring
- Use CloudWatch (AWS) or Datadog for infrastructure
- Setup uptime monitoring with UptimeRobot

## Rollback Plan

### If Deployment Fails
```bash
# Revert to previous image
docker pull yourregistry/medesign-backend:previous
docker-compose up -d

# Or with PM2
pm2 restart medesign-backend
pm2 revert  # Revert changes
```

### Restore Database
```bash
# Stop application
docker-compose stop backend

# Restore backup
psql -U prod_user -h prod-db.example.com medesign_prod < backup.sql

# Start application
docker-compose start backend
```

## Post-Deployment Checklist

- [ ] Application is running
- [ ] Health check endpoint responds
- [ ] Database connections working
- [ ] Environment variables correct
- [ ] SSL certificate valid
- [ ] Firewall rules configured
- [ ] Backups working
- [ ] Monitoring active
- [ ] Logging configured
- [ ] Admin user created
- [ ] Frontend can connect
- [ ] API endpoints responding

## Maintenance

### Regular Tasks
- Weekly: Check logs for errors
- Monthly: Review database size
- Quarterly: Update dependencies
- Annually: Review security

### Backup Schedule
- Daily: Automated database backup
- Weekly: Full system snapshot
- Monthly: Off-site backup

## Support

For deployment issues, refer to:
- [README.md](./README.md)
- [SETUP_DATABASE.md](./SETUP_DATABASE.md)
- Docker documentation
- NestJS documentation
