# PostgreSQL Database Setup Guide

This guide will help you set up PostgreSQL for the Med Design backend.

## Installation

### macOS (using Homebrew)

```bash
# Install PostgreSQL
brew install postgresql@16

# Start PostgreSQL service
brew services start postgresql@16

# Verify installation
psql --version
```

### Windows

1. Download the PostgreSQL installer from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. PostgreSQL will start automatically

### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql

# Verify installation
psql --version
```

---

## Create Database

### Using psql (Command Line)

1. **Connect to PostgreSQL:**
```bash
psql -U postgres
```

You'll be prompted for the password.

2. **Create the database:**
```sql
CREATE DATABASE medesign;
```

3. **Exit psql:**
```sql
\q
```

### Using GUI Tools

You can also use pgAdmin (web interface) or DBeaver (desktop application) to create the database graphically.

---

## Verify Setup

### Test Connection

```bash
# Connect to the medesign database
psql -U postgres -d medesign

# You should see the prompt:
# medesign=#

# Exit
\q
```

### From Backend

When you run the backend for the first time, it will automatically create all tables based on the entities.

```bash
npm run start:dev
```

Check the console for confirmation:
```
TypeORM - Connected to database
```

---

## Database Configuration

The backend uses these settings from `.env.local`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=medesign
```

**Change the password** for production use!

---

## Useful PostgreSQL Commands

```bash
# Connect to database
psql -U postgres -d medesign

# List all databases
\l

# List all tables
\dt

# Describe a table
\d table_name

# Run SQL query from file
psql -U postgres -d medesign -f script.sql

# Backup database
pg_dump -U postgres -d medesign > backup.sql

# Restore database
psql -U postgres -d medesign < backup.sql

# Delete database
dropdb -U postgres medesign

# Connect as different user
psql -U username -h localhost -d medesign
```

---

## pgAdmin Web Interface

pgAdmin is a web-based PostgreSQL management tool.

### Installation (macOS)

```bash
brew install pgadmin4
```

### Installation (Windows/Linux)

Visit [pgadmin.org](https://www.pgadmin.org/download/) for installation.

### Accessing pgAdmin

1. Launch pgAdmin
2. Go to `http://localhost:5050`
3. Create a server connection to localhost:5432
4. Browse databases and manage tables

---

## Docker PostgreSQL (Alternative)

If you prefer not to install PostgreSQL locally, use Docker:

```bash
# Pull PostgreSQL image
docker pull postgres:16-alpine

# Run PostgreSQL container
docker run -d \
  --name medesign-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=medesign \
  -p 5432:5432 \
  postgres:16-alpine
```

Then use the connection settings:
- Host: `localhost`
- Port: `5432`
- Username: `postgres`
- Password: `postgres`
- Database: `medesign`

---

## Troubleshooting

### Connection Refused

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
- Ensure PostgreSQL is running: `brew services list` (macOS) or `sudo systemctl status postgresql` (Linux)
- Check port 5432 is not blocked by firewall

### Authentication Failed

```
Error: password authentication failed for user "postgres"
```

**Solution:**
- Verify password in `.env.local`
- Reset PostgreSQL password:
  ```bash
  # On macOS
  psql -U postgres
  ALTER USER postgres WITH PASSWORD 'new_password';
  \q
  ```

### Database Already Exists

```
Error: database "medesign" already exists
```

**Solution:**
- Drop existing database:
  ```bash
  dropdb -U postgres medesign
  ```
- Or use a different database name in `.env.local`

### psql Command Not Found

```bash
# Add PostgreSQL to PATH
export PATH="/usr/local/opt/postgresql@16/bin:$PATH"

# Add to ~/.zshrc or ~/.bash_profile for permanent setup
```

---

## Security Best Practices

1. **Change Default Password:**
   ```sql
   ALTER USER postgres WITH PASSWORD 'strong_password_here';
   ```

2. **Create Application User:**
   ```sql
   CREATE ROLE medesign_user WITH LOGIN PASSWORD 'app_password';
   GRANT ALL PRIVILEGES ON DATABASE medesign TO medesign_user;
   ```

3. **Use Different Passwords:**
   - Don't use default `postgres` password in production
   - Create separate users for different environments

4. **Restrict Access:**
   - Configure `pg_hba.conf` to limit connections
   - Use firewall rules to restrict database access

5. **Backup Regularly:**
   ```bash
   pg_dump -U postgres -d medesign > backups/medesign_$(date +%Y%m%d).sql
   ```

---

## Next Steps

1. Verify your database is running
2. Create the `medesign` database
3. Update `.env.local` with your credentials
4. Start the backend: `npm run start:dev`
5. Tables will be auto-created on first run

For more details, see [README.md](./README.md) or [QUICKSTART.md](./QUICKSTART.md)
