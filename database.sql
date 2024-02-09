create database infoSec;
use infoSec;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    authority INT not NULL
);
CREATE TABLE forum(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(100) NOT NULL,
message VARCHAR(255) NOT NULL,
userId INT not NULL
);
INSERT INTO users (username, email, password, authority)
VALUES ('admin', 'admin@example.com', 'admin', 5);

select * from users;