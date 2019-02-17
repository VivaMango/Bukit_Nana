CREATE DATABASE bukit_db;

USE bukit_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL DEFAULT "Bukit Product",
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) DEFAULT 9.99,
    stock_quantity INT(10) DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coredelle's Mixtape", "MUSIC", 15.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NOW That's What I Call Drifting", "MUSIC", 23.99, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tokyo Drift: the Soundtrack", "MUSIC", 12.99, 44);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Teriyaki Boyz Greatest Hits", "MUSIC", 17.99, 72);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("21 Savage - ICE FROZE MY WRISTS TOGETHER SINGLE", "MUSIC", 1.99, 0);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ESPN 30 FOR 30 - TOM BRADY AND THE INFINITY GAUNTLET", "MOVIES", 8.99, 244);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tokyo Drift", "MOVIES", 6.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tokyo Drift 2: Hiroshima Hairpins", "MOVIES", 29.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tokyo Drift 3: Drunk Drifting", "MOVIES", 59.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("A Dang Shame, Tony's Memorial", "MOVIES", 0.99, 999);