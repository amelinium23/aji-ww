CREATE TABLE IF NOT EXISTS products(id INT AUTO_INCREMENT PRIMARY KEY, name TEXT, description TEXT, price DECIMAL(4,2), weight DECIMAL(3,2), category_id INT NOT NULL,FOREIGN KEY (category_id) REFERENCES categories(id));
CREATE TABLE IF NOT EXISTS categories(id INT AUTO_INCREMENT PRIMARY KEY, name TEXT)
CREATE TABLE IF NOT EXISTS statuses(id INT AUTO_INCREMENT PRIMARY KEY, name ENUM ('UNAPPROVED', 'APPROVED', 'CANCLED', 'REALIZED'));
CREATE TABLE IF NOT EXISTS orders(id INT AUTO_INCREMENT PRIMARY KEY,state INT, phoneNumber TEXT, approval_date TEXT,username TEXT,email TEXT, product_id INT,FOREIGN KEY (state) REFERENCES statuses(id));

INSERT INTO categories(name) VALUES ('fruits');
INSERT INTO categories(name) VALUES ('vegetables');
INSERT INTO categories(name) VALUES ('household');

INSERT INTO products(name, description, price, weight, category_id) VALUES('Apple', 'Great apples from Cupertino', 2.90, 1.00, 1);
INSERT INTO products(name, description, price, weight, category_id) VALUES('Onion', 'Polish onion make Poland great again', 0.90, 1.00, 2);
INSERT INTO products(name, description, price, weight, category_id) VALUES('Tomato', 'Mmmm, water ', 3.60, 1.00, 2);
INSERT INTO products(name, description, price, weight, category_id) VALUES('Domestos', 'Kill old bacteria and others!', 20.90, 1.00, 3);

INSERT INTO statuses(name) VALUES('UNAPPROVED');
INSERT INTO statuses(name) VALUES('APPROVED');
INSERT INTO statuses(name) VALUES('CANCLED');
INSERT INTO statuses(name) VALUES('REALIZED');

INSERT INTO orders(state, approval_date, username, email, product_id) VALUES(1, "2021-10-31", 'amelinium23', '230025@edu.p.lodz.pl', 1);
INSERT INTO orders(state, approval_date, username, email, product_id) VALUES(1, "2021-10-31", 'piot2000', 'email@gmail.com', 2);
INSERT INTO orders(state, approval_date, username, email, product_id) VALUES(3, "2021-10-31", 'vertix', 'email.pass@wp.com', 2);