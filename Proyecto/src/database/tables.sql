/*CREATE TABLE users (
    id int(5) unsigned unique AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(30) NOT NULL PRIMARY KEY,
    password VARCHAR(20) NOT NULL);


Acount:
CREATE TABLE users(
id INT UNIQUE NOT NULL AUTO_INCREMENT,
name VARCHAR(40) NOT NULL,
email VARCHAR(40) NOT NULL PRIMARY KEY,
password VARCHAR(40) NOT NULL,
phone VARCHAR(13),
address VARCHAR(200),
createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
isSeller bit);
*/
CREATE DATABASE project;
USE project;

CREATE TABLE users (
    id VARCHAR(100) UNIQUE,
    name VARCHAR(20),
    email VARCHAR(40) PRIMARY KEY,
    password VARCHAR(255),
    phone VARCHAR(13),
    address VARCHAR(255),
    country VARCHAR(40) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_seller BOOLEAN,
    is_admin BOOLEAN DEFAULT 0
);

CREATE TABLE products(
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    price FLOAT NOT NULL,
    category_id VARCHAR(100) REFERENCES category(id),
    up_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    seller VARCHAR(40) REFERENCES users(email),
    offers INT DEFAULT 0,
    nClick INT DEFAULT 0,
    description VARCHAR(255),
    path VARCHAR(100)
);

CREATE TABLE image(
    id VARCHAR(100) PRIMARY KEY,
    filename VARCHAR(100) NOT NULL UNIQUE,
    PATH VARCHAR(100),
    extname VARCHAR(20) NOT NULL,
    product_id VARCHAR(100) REFERENCES products(id)
);

CREATE TABLE category(
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE expense_record(
    id VARCHAR(100) PRIMARY KEY,
    quantity int NOT NULL,
    create_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_email VARCHAR(40) REFERENCES users(email),
    product_id VARCHAR(100) REFERENCES products(id)
);

CREATE TABLE shopping_cart(
    account_email VARCHAR(40) REFERENCES users(email),
    product_id VARCHAR(100) REFERENCES products(id),
    quantity INT(4) NOT NULL
);

INSERT INTO category VALUES ('bkCa','Books & Cinema');
INSERT INTO category VALUES ('elcs','Electronics');
INSERT INTO category VALUES ('PC','Computers');
INSERT INTO category VALUES ('stHe','Smart Home');
INSERT INTO category VALUES ('asCs','Arts & Crafts');
INSERT INTO category VALUES ('tsBy','Toys & Baby');
INSERT INTO category VALUES ('gnPs','Garden & pets');
INSERT INTO category VALUES ('ssOrs','Sports & Outdoors');
INSERT INTO category VALUES ('voGs','Video Games');