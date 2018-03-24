CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    password VARCHAR
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    user_id INT,
    name VARCHAR,
    description VARCHAR,
    address VARCHAR,
    city VARCHAR,
    state VARCHAR,
    zip_code VARCHAR,
    url VARCHAR,
    loan VARCHAR,
    mortgage VARCHAR,
    desired_rent VARCHAR,
    recommended_rent VARCHAR,
    FOREIGN KEY (user_id) REFERENCES users(id)
);