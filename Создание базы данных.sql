--Таблица с пользователями
DROP TABLE dev.t_role;
DROP TABLE dev.t_user;

CREATE TABLE dev.t_user
(
  id serial PRIMARY KEY NOT NULL,
  full_name character varying(120),
  username character varying(60),
  password character varying(60),
  fk_user_role INTEGER REFERENCES dev.t_role(id)
);

--Таблица с ролями
CREATE TABLE dev.t_role
(
  id serial PRIMARY KEY NOT NULL ,
  type character varying(60)
);

--Наполняем таблицы данными
INSERT INTO dev.t_role VALUES (1, 'salesman');
INSERT INTO dev.t_role VALUES (2, 'ROLE_USER');
select * from dev.t_role;

INSERT INTO dev.t_user VALUES (1, 'Директор', 'user1', 'pass1', 2);
INSERT INTO dev.t_user VALUES (2, 'Продавец', 'user2', 'pass2', 1);
select * from dev.t_user;