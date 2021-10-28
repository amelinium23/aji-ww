CREATE TABLE IF NOT EXISTS products(id INT AUTO_INCREMENT PRIMARY KEY, name TEXT, description TEXT, price DECIMAL(4,2), weight DECIMAL(3,2), category_id INT NOT NULL,FOREIGN KEY (category_id) REFERENCES categories(id));

CREATE TABLE IF NOT EXISTS categories(id INT AUTO_INCREMENT PRIMARY KEY, name TEXT);

CREATE TABLE IF NOT EXISTS orders(id INT AUTO_INCREMENT PRIMARY KEY,state ENUM ('NIEZATWIERDZONE', 'ZATWIERDZONE', 'ANULOWANE', 'ZREALIZOWANE'),approval_date DATE,	username TEXT, email TEXT, product_id UNSIGNED INT,);

INSERT INTO categories(name) VALUES ('fruits');
INSERT INTO categories(name) VALUES ('vegetables');
INSERT INTO categories(name) VALUES ('household');
INSERT INTO products(name, description, price, weight, category_id) VALUES('Apple', 'Great apples from Cupertino', 2.90, 1.00, 1);
INSERT INTO products(name, description, price, weight, category_id) VALUES('Onion', 'Polish onion make Poland great again', 0.90, 1.00, 2);
INSERT INTO products(name, description, price, weight, category_id) VALUES('Tomato', 'Mmmm, water ', 3.60, 1.00, 2);
INSERT INTO products(name, description, price, weight, category_id) VALUES('Domestos', 'Kill old bacteria and others!', 20.90, 1.00, 3);