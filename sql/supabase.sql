-- users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    primary_currency VARCHAR(10) NOT NULL
);

-- Optional: Create an index on the email column for faster searches
CREATE INDEX idx_users_email ON users(email);
