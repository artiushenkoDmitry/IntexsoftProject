﻿select * from dev.t_vendor_code;

--Таблица с пользователями
DROP TABLE dev.t_role;
DROP TABLE dev.t_user;

CREATE TABLE dev.t_user
(
  id serial PRIMARY KEY NOT NULL,
  full_name character varying(120),
  username character varying(60) UNIQUE,
  password character varying(60),
  fk_user_role INTEGER REFERENCES dev.t_role(id) NOT NULL
  --fk_user_brand INTEGER REFERENCES dev.t_brand(id) 
);
select * from dev.t_user
--Таблица с ролями
CREATE TABLE dev.t_role
(
  id serial PRIMARY KEY NOT NULL ,
  type character varying(60) NOT NULL
);

--Наполняем таблицы данными
INSERT INTO dev.t_role VALUES (1, 'ROLE_SALESMAN');
INSERT INTO dev.t_role VALUES (2, 'ROLE_HEADMASTER');
select * from dev.t_role;

delete from dev.t_user
INSERT INTO dev.t_user VALUES (1,'Эммануил Гедеонович', 'user3', '$2a$10$yJjyRJlY8uLymg1eLfOateIvBrP69MV29XrkFO7m9VCnEDP5XfQAO', 2);
INSERT INTO dev.t_user VALUES (2, 'Виталий', 'user1', '$2a$10$lNXH76ln0avh.TEMWgh5yeOlU8YMKYU888/ocKq6MIYhJ4JL9JjJa', 1);
INSERT INTO dev.t_user VALUES (3, 'Сергей', 'user2', '$2a$10$.Zm8KimuC2H8X66UqFnoXegqhZnLWocynNa87r3fZdATdV233BARy', 1);
select * from dev.t_user;

///////////////////////////////

ALTER TABLE dev.t_vendor_code
ADD COLUMN reserved INTEGER DEFAULT 0;

drop table dev.t_vendor_code
CREATE TABLE dev.t_vendor_code(
id serial PRIMARY KEY NOT NULL,
quantity_available INTEGER NOT NULL,
prise INTEGER NOT NULL,
size character varying(20), 
fk_vendor_code_brand INTEGER REFERENCES dev.t_brand(id) ON DELETE CASCADE NOT NULL,
fk_vendor_code_type INTEGER REFERENCES dev.t_type(id) ON DELETE CASCADE NOT NULL,
fk_vendor_code_age_gender INTEGER REFERENCES dev.t_age_gender(id) ON DELETE CASCADE NOT NULL,
fk_vendor_code_user INTEGER REFERENCES dev.t_user(id) ON DELETE CASCADE NOT NULL
--reserved INTEGER DEFAULT 0;
--fk_vendor_code_order INTEGER REFERENCES dev.t_order(id) ON DELETE CASCADE
);
SELECT * FROM dev.t_vendor_code
UPDATE dev.t_vendor_code SET reserved = 10 WHERE id = 14

DROP TABLE dev.t_age_gender;
CREATE TABLE dev.t_age_gender(
id serial PRIMARY KEY NOT NULL,
age_gender character varying(120)
);

DROP TABLE dev.t_brand;
CREATE TABLE dev.t_brand(
id serial PRIMARY KEY NOT NULL,
brand_name character varying(120)
);
select * from dev.t_brand

DROP TABLE dev.t_type;
CREATE TABLE dev.t_type(
id serial PRIMARY KEY NOT NULL,
type_name character varying(120)
);

ALTER TABLE dev.t_order DROP COLUMN is_approved;
DROP TABLE dev.t_order;
CREATE TABLE dev.t_order(
id serial PRIMARY KEY NOT NULL,
quantity_ordered INTEGER,
--is_approved BOOLEAN,
customer_name character varying(120),
customer_email character varying(20),
customer_address  character varying(20),
fk_order_vendor_code INTEGER REFERENCES dev.t_vendor_code(id)
--fk_order_bascket INTEGER REFERENCES dev.t_order(id) ON DELETE CASCADE NOT NULL
);
INSERT INTO dev.t_order (quantity_ordered, is_approved, customer_name, customer_email, customer_address, fk_order_vendor_code) 
VALUES(1, false, 'Дима', 'dima@mail.ru', 'ул.Длинная, д.100500', 2);
SELECT * FROM dev.t_order;


--DROP TABLE dev.t_basket;
--CREATE TABLE dev.t_basket(
--id serial PRIMARY KEY NOT NULL,
--customer_name character varying(120),
--customer_phone character varying(20),
--customer_address  character varying(20)
--);

INSERT INTO dev.t_brand (brand_name) VALUES ('adidas');
INSERT INTO dev.t_brand (brand_name) VALUES ('BOSS');
INSERT INTO dev.t_brand (brand_name) VALUES ('Bvlgari');
INSERT INTO dev.t_brand (brand_name) VALUES ('BELARUSACHKA');
SELECT * FROM dev.t_brand;

INSERT INTO dev.t_type (type_name) VALUES ('туфли');
INSERT INTO dev.t_type (type_name) VALUES ('джинсы');
INSERT INTO dev.t_type (type_name) VALUES ('рубашка');
INSERT INTO dev.t_type (type_name) VALUES ('спортивная одежда');
SELECT * FROM dev.t_type;

INSERT INTO dev.t_age_gender (age_gender) VALUES ('одежда для мальчиков');
INSERT INTO dev.t_age_gender (age_gender) VALUES ('одежда для девочек');
INSERT INTO dev.t_age_gender (age_gender) VALUES ('мужская одежда');
INSERT INTO dev.t_age_gender (age_gender) VALUES ('женская одежда');
SELECT * FROM dev.t_age_gender;

INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,10,1, 4, 1, 2);
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,10,1, 4, 2, 2);
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,10,1, 4, 3, 2);		       
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,10,1, 4, 4, 2);

INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,100,2, 3, 1, 3);
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,100,2, 3, 2, 3);
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,100,2, 3, 3, 3);		       
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,10,2, 3, 4, 3);

INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,50,3, 2, 1, 3);
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,50,3, 2, 2, 3);
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,50,3, 2, 3, 3);
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,50,3, 2, 4, 3);

INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,75,4, 1, 1, 2);
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,75,4, 1, 2, 2);
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,75,4, 1, 3, 2);
INSERT INTO dev.t_vendor_code (quantity_available, prise, fk_vendor_code_brand, fk_vendor_code_type, fk_vendor_code_age_gender, fk_vendor_code_user)
		       VALUES (100,75,4, 1, 4, 2);

update dev.t_vendor_code set size = '152' WHERE id = 1;
update dev.t_vendor_code set size = '158' WHERE id = 2;
update dev.t_vendor_code set size = '152' WHERE id = 3;
update dev.t_vendor_code set size = '32' WHERE id = 4;
update dev.t_vendor_code set size = '150' WHERE id = 5;
update dev.t_vendor_code set size = '156' WHERE id = 6;
update dev.t_vendor_code set size = '150' WHERE id = 7;
update dev.t_vendor_code set size = '28' WHERE id = 8;
update dev.t_vendor_code set size = '46/48' WHERE id = 9;
update dev.t_vendor_code set size = '42' WHERE id = 10;
update dev.t_vendor_code set size = '48' WHERE id = 11;
update dev.t_vendor_code set size = '42' WHERE id = 12;
update dev.t_vendor_code set size = '44/46' WHERE id = 13;
update dev.t_vendor_code set size = '42' WHERE id = 14;
update dev.t_vendor_code set size = '46' WHERE id = 15;
update dev.t_vendor_code set size = '38' WHERE id = 16;			   

//////////////////////////////////////////
SELECT * FROM dev.t_vendor_code;
SELECT t_vendor_code.id, t_vendor_code.quantity_available, t_vendor_code.prise  FROM dev.t_vendor_code JOIN dev.t_brand on t_vendor_code.fk_vendor_code_brand = t_brand.id;

SELECT t_vendor_code.quantity_available, t_vendor_code.prise, t_brand.brand_name, t_type.type_name, t_age_gender.age_gender FROM dev.t_vendor_code 
						JOIN dev.t_brand ON t_vendor_code.fk_vendor_code_brand = t_brand.id
						JOIN dev.t_type ON t_vendor_code.fk_vendor_code_type = t_type.id
						JOIN dev.t_age_gender ON t_vendor_code.fk_vendor_code_age_gender = t_age_gender.id
						WHERE t_type.type_name='рубашка';

SELECT * FROM dev.t_type;
UPDATE dev.t_type SET type_name = 'jeans' WHERE id = 2;

////////////////////
Запуск хрома для дебага
C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
///////////////////
Работа с блобами в БД
CREATE TABLE dev.fruit (name CHAR(30), image OID); 
CREATE TABLE fruit (name CHAR(30), image OID);
INSERT INTO dev.fruit VALUES ('peach', lo_import('c:/1.jpg')); 