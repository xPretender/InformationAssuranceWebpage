
create TABLE user(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
)
insert into user(username,password) values('admin','admin');
select * from user;