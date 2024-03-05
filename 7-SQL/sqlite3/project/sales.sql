DROP TABLE IF EXISTS clients;
CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  street TEXT,
  neighborhood TEXT,
  city TEXT
);

DROP TABLE IF EXISTS phones;
CREATE TABLE IF NOT EXISTS phones (
  number TEXT NOT NULL,
  client_id INTEGER NOT NULL,
  PRIMARY KEY(number, client_id),
  FOREIGN KEY(client_id) REFERENCES clients(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL
);

DROP TABLE IF EXISTS sales;
CREATE TABLE IF NOT EXISTS sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_client INTEGER NOT NULL,
  id_product INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(id_client) REFERENCES clients(id) ON DELETE CASCADE
  FOREIGN KEY(id_product) REFERENCES products(id)
);

INSERT INTO clients (name, cpf) VALUES
  ("Jonatan","123.123.123-00"),
  ("Daniel","123.123.123-01"),
  ("Natan","123.123.123-02");

SELECT * FROM clients;

INSERT INTO phones (number, client_id) VALUES
  ("(88) 8888-8888", 1),
  ("(99) 9999-9999", 1),
  ("(00) 0000-0000", 2),
  ("(77) 7777-7777", 3);

SELECT * FROM phones;

INSERT INTO products (name, price) VALUES 
  ("Smartwatche", 450), 
  ("Samsumg M54", 1800),
  ("Acer Aspire 5", 2830.75),
  ("Lenovo IdeaPad", 2602.25);

SELECT * FROM products;

INSERT INTO sales (id_client, id_product, amount) VALUES 
  (1, 1, 2), 
  (2, 2, 4),
  (2, 4, 2),
  (3, 3, 5);
    
SELECT * FROM sales;

SELECT clients.name, phones.number
FROM clients
INNER JOIN phones
ON clients.id = phones.client_id
ORDER BY clients.name;

SELECT clients.name AS Nome_Cliente, 
       products.name AS Produto, 
       sales.amount, 
       sales.amount * products.price AS Total_Vendido

FROM clients
INNER JOIN sales ON sales.id_client = clients.id
INNER JOIN products ON sales.id_product = products.id
ORDER BY clients.name;

SELECT * FROM clients;
DELETE FROM clients WHERE id = 1;
