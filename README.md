

# Model

- Tag
- User
- article

# Postgres - TypeORM
1. psql-U usename -d databasename -h your_host -p your_port g
2. CREATE DATABASE blog;
3. CREATE USER devuser WITH ENCRYPTED PASSWORD '1234';
4. GRANT ALL PRIVILEGES ON DATABASE blog TO devuser;
5. GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO devuser;
6.  GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO devuser;
7.   GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO devuser;