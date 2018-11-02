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
INSERT INTO dev.t_role VALUES (1, 'ROLE_USER');
INSERT INTO dev.t_role VALUES (2, 'ROLE_ADMIN');
select * from dev.t_role;

INSERT INTO dev.t_user VALUES ('Иммануил Гедеонович', 'user3', '$2a$10$yJjyRJlY8uLymg1eLfOateIvBrP69MV29XrkFO7m9VCnEDP5XfQAO', 2);
INSERT INTO dev.t_user VALUES ('Продавец №1', 'user1', '$2a$10$lNXH76ln0avh.TEMWgh5yeOlU8YMKYU888/ocKq6MIYhJ4JL9JjJa', 1);
INSERT INTO dev.t_user VALUES ('Продавец №2', 'user2', '$2a$10$.Zm8KimuC2H8X66UqFnoXegqhZnLWocynNa87r3fZdATdV233BARy', 1);
select * from dev.t_user;