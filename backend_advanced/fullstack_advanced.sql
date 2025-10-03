-- fullstack_advanced SQL dump
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS cart (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    quantity INT DEFAULT 1
);

-- Insert 50000 products using generate_series
INSERT INTO products (name, description, price)
SELECT
  'Product ' || g,
  'Description for product ' || g,
  round(random()*10000::numeric,2)
FROM generate_series(1, 50000) g;

-- Optional small sample for sanity
INSERT INTO products (name, description, price) VALUES
('Laptop', '15 inch laptop with 8GB RAM', 55000.00),
('Smartphone', 'Android smartphone with 128GB storage', 25000.00);
