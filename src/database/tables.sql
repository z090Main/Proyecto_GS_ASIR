CREATE TABLE users (
    id int(5) unsigned unique AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(30) NOT NULL PRIMARY KEY,
    password VARCHAR(20) NOT NULL);
