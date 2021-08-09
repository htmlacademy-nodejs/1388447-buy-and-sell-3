CREATE TABLE users(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password_hash varchar(255) NOT NULL,
    avatar varchar(50) NOT NULL
);

CREATE TABLE offers(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title varchar(255) NOT NULL,
    description text NOT NULL,
    sum integer NOT NULL,
    picture varchar(50) NOT NULL,
    type varchar (5) NOT NULL,
    created_at timestamp DEFAULT current_timestamp NOT NULL,
    user_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(255) NOT NULL
);

CREATE TABLE comments(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text varchar(255) NOT NULL,
    user_id integer NOT NULL,
    offer_id integer NOT NULL,
    create_at timestamp DEFAULT current_timestamp NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (offer_id) REFERENCES offers(id)
);

CREATE TABLE offer_categories(
    offer_id integer NOT NULL,
    category_id integer NOT NULL,
    PRIMARY KEY (offer_id, category_id),
    FOREIGN KEY (offer_id) REFERENCES offers(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON offers(title);
