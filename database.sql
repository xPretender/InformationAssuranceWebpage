
create TABLE user(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
)
insert into user(username,password) values('admin','admin');


CREATE TABLE forum(
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    user_id INTEGER NOT NULL
)

select * from forum;
select * from user;