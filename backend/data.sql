DROP TABLE IF EXISTS prod_ordered;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS inventory;

CREATE TABLE inventory(	
    part_number INT PRIMARY KEY NOT NULL, 
    description VARCHAR(50) NOT NULL, 
    qty INT NOT NULL);
    
CREATE TABLE customer(
    customer_number INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    name VARCHAR(40) NOT NULL, 
    email VARCHAR(40) NOT NULL, 
    address VARCHAR(80) NOT NULL, 
    cc VARCHAR(20) NOT NULL, 
    exp VARCHAR(8) NOT NULL);
    
CREATE TABLE orders(
    order_number INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    customer_number INT NOT NULL, 
    total DOUBLE(100,2), 
    ord_date DATE, 
    status VARCHAR(20) DEFAULT "pending", 
    	FOREIGN KEY (customer_number) REFERENCES customer(customer_number)); 
        
CREATE TABLE prod_ordered(
    order_number INT NOT NULL, 
    part_number INT NOT NULL, 
    qty INT NOT NULL,
		FOREIGN KEY (order_number) REFERENCES orders(order_number),
		FOREIGN KEY (part_number) REFERENCES inventory(part_number));
        
INSERT INTO inventory(part_number, description, qty) VALUES
	(1, "windsheild w/ polymer", 2),
    (2, "wiper blade pair", 3),
    (3, "solenoid", 5),
    (4, "tiresome mettle", 1),
    (5, "bucket seat pair", 2);
    
INSERT INTO customer(name, email, address, cc, exp) VALUES
	("Andrea Hepker", "me@gmail.com", "123 Main St. Town, IL 65432", "4444 2200 5555 1234", "10/3030"),
    ("Jake Rogers", "jake@jake.com", "321 Center St. Town, IL 65432", "4455 2222 5566 9876", "01/2021"),
    ("Greg Gomez", "greg@greg.org", "456 Street Ln. Town, IL 65432", "4455 2222 6655 6789", "12/2034"),
    ("Carly Dobie", "carly@carly.net", "123 Parkway, Town, IL 65432", "4444 5522 6645 1212", "06/2060");
    
INSERT INTO orders(customer_number, total, ord_date) VALUES
	(1, 23.04, "2020-10-29"),
    (2, 100.01, "2020-10-29"),
    (1, 450.99, "2020-10-01"),
    (3, 19.99, "2020-09-30");
    
INSERT INTO prod_ordered(order_number, part_number, qty) VALUES
	(1, 3, 2),
    (1, 1, 1),
    (2, 2, 1),
    (3, 1, 1),
    (3, 2, 1),
    (4, 4, 1),
    (4, 3, 1),
    (4, 2, 1);