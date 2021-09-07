/* Replace with your SQL commands */

CREATE TABLE order_products (
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    order_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
