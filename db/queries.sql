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

-- CREATE TABLE comments (
--   ID SERIAL PRIMARY KEY,
--   comment VARCHAR(1000),
--   articleID VARCHAR(100),
-- 	commenterID VARCHAR(100)
-- );

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

-- ALTER TABLE posts 
-- ADD COLUMN articleComments jsonb default '{}'::jsonb

-- update posts set articleComments='[{"commenter":"f6b66c92-fd65-4c01-84c4-b6c8a173d924","comment":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,tenetur error, harum nesciunt ipsum debitis quas aliquid."},{"commenter":"f6b66c92-fd65-4c01-84c4-b6c8a173d924","comment":"Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime"}]'
-- WHERE id in(3,5,6,4)


-- SELECT 
--    table_name, 
--    column_name, 
--    data_type 
-- FROM 
--    information_schema.columns
-- WHERE 
--    table_name = 'posts';

