CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  username VARCHAR(30),
  password VARCHAR(30),
  type VARCHAR(30)
);

INSERT INTO users (name, email)
   VALUES ('Joe', 'joe@example.com'), ('Ruby', 'ruby@example.com');

  

CREATE TABLE posts (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(100),
  description VARCHAR(100),
  type VARCHAR(30)
);

INSERT INTO posts (title, description, type)
   VALUES ('Test post', 'Initial post for test on new platform this is the description', '1'), ('Test post2', 'Second post for test on new platform this is the description', '2');