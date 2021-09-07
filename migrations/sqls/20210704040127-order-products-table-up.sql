/* Replace with your SQL commands */

CREATE TABLE order_products (
    product_id INTEGER,
    quantity INTEGER,
    order_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
