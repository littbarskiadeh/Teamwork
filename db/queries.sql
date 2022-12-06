-- CREATE TABLE users (
--   ID SERIAL PRIMARY KEY,
--   name VARCHAR(30),
--   username VARCHAR(30),
--   password VARCHAR(30),
--   type VARCHAR(30)
-- );

CREATE TABLE IF NOT EXISTS
      users(
        ID SERIAL PRIMARY KEY,
        name VARCHAR(128),
        username VARCHAR(128),
        password VARCHAR(128),
        usertype VARCHAR(128),
        email VARCHAR(128),
        -- email VARCHAR(128) UNIQUE NOT NULL,
        user_id VARCHAR(128),
        isloggedin VARCHAR(128),
        created_date TIMESTAMP,
        
      )

CREATE TABLE IF NOT EXISTS
      posts (
        ID SERIAL PRIMARY KEY,
        title VARCHAR(100),
        description VARCHAR(100),
        type VARCHAR(30),
        created_date TIMESTAMP
      )

-- Update column names
-- INSERT INTO users (name, email)
--    VALUES ('Joe', 'joe@example.com'), ('Ruby', 'ruby@example.com'), ('Test User82', 'test842.domain@mail.com');


-- CREATE TABLE posts (
--   ID SERIAL PRIMARY KEY,
--   title VARCHAR(100),
--   description VARCHAR(100),
--   type VARCHAR(30)
-- );

-- Update columns
-- INSERT INTO posts (title, description, type)
--    VALUES ('Test post', 'Initial post for test on new platform this is the description', '1'), ('Test post2', 'Second post for test on new platform this is the description', '2');
