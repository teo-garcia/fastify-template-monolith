
# Users
# Create Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
)

# Insert Data
INSERT INTO users (name, email, password)
VALUES
  ('User 1', 'user1@example.com', 'password1'),
  ('User 2', 'user2@example.com', 'password2'),
  ('User 3', 'user3@example.com', 'password3'),
  ('User 4', 'user4@example.com', 'password4'),
  ('User 5', 'user5@example.com', 'password5'),
  ('User 6', 'user6@example.com', 'password6'),
  ('User 7', 'user7@example.com', 'password7'),
  ('User 8', 'user8@example.com', 'password8'),
  ('User 9', 'user9@example.com', 'password9'),
  ('User 10', 'user10@example.com', 'password10'),
  ('User 11', 'user11@example.com', 'password11'),
  ('User 12', 'user12@example.com', 'password12'),
  ('User 13', 'user13@example.com', 'password13'),
  ('User 14', 'user14@example.com', 'password14'),
  ('User 15', 'user15@example.com', 'password15'),
  ('User 16', 'user16@example.com', 'password16'),
  ('User 17', 'user17@example.com', 'password17'),
  ('User 18', 'user18@example.com', 'password18'),
  ('User 19', 'user19@example.com', 'password19'),
  ('User 20', 'user20@example.com', 'password20');


# Todos
# Create Table
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  description TEXT,
  status VARCHAR(255),
  user_id INTEGER REFERENCES users (id)
);

# Insert Data
INSERT INTO todos (description, status, user_id)
VALUES
  ('Todo item 1', 'in-progress', 1),
  ('Todo item 2', 'to-do', 2),
  ('Todo item 3', 'done', 3),
  ('Todo item 4', 'in-progress', 4),
  ('Todo item 5', 'to-do', 5),
  ('Todo item 6', 'done', 6),
  ('Todo item 7', 'in-progress', 7),
  ('Todo item 8', 'to-do', 8),
  ('Todo item 9', 'done', 9),
  ('Todo item 10', 'in-progress', 10),
  ('Todo item 11', 'to-do', 11),
  ('Todo item 12', 'done', 12),
  ('Todo item 13', 'in-progress', 13),
  ('Todo item 14', 'to-do', 14),
  ('Todo item 15', 'done', 15),
  ('Todo item 16', 'in-progress', 16),
  ('Todo item 17', 'to-do', 17),
  ('Todo item 18', 'done', 18),
  ('Todo item 19', 'in-progress', 19),
  ('Todo item 20', 'to-do', 20),
  ('Todo item 21', 'done', 1),
  ('Todo item 22', 'in-progress', 2),
  ('Todo item 23', 'to-do', 3),
  ('Todo item 24', 'done', 4),
  ('Todo item 25', 'in-progress', 5),
  ('Todo item 26', 'to-do', 6),
  ('Todo item 27', 'done', 7),
  ('Todo item 28', 'in-progress', 8),
  ('Todo item 29', 'to-do', 9),
  ('Todo item 30', 'done', 10),
  ('Todo item 31', 'in-progress', 11),
  ('Todo item 32', 'to-do', 12),
  ('Todo item 33', 'done', 13),
  ('Todo item 34', 'in-progress', 14),
  ('Todo item 35', 'to-do', 15),
  ('Todo item 36', 'done', 16),
  ('Todo item 37', 'in-progress', 17),
  ('Todo item 38', 'to-do', 18),
  ('Todo item 39', 'done', 19),
  ('Todo item 40', 'in-progress', 20),
  ('Todo item 41', 'to-do', 1),
  ('Todo item 42', 'done', 2),
  ('Todo item 43', 'in-progress', 3),
  ('Todo item 44', 'to-do', 4),
  ('Todo item 45', 'done', 5),
  ('Todo item 46', 'in-progress', 6),
  ('Todo item 47', 'to-do', 7),
  ('Todo item 48', 'done', 8),
  ('Todo item 49', 'in-progress', 9),
  ('Todo item 50', 'to-do', 10);
