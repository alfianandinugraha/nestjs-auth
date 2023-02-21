-- SQLite
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  "user_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "name" varchar(255) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL
);

DROP TABLE IF EXISTS "tokens";
CREATE TABLE "tokens" (
  "token_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "token" TEXT NOT NULL,
  "user_id" INTEGER NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@gmail.com', '123456');

