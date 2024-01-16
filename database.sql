
create TABLE user(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
)
insert into user(username,password) values('admin','admin');
select * from user;

CREATE TABLE forum(
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    user_id INTEGER NOT NULL
)
DROP TABLE forum;
select * from forum;