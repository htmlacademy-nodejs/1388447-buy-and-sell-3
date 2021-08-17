INSERT INTO users(email, password_hash, first_name, last_name, avatar)
VALUES ('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
       ('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');

INSERT INTO categories(name)
VALUES ('Книги'),
       ('Разное'),
       ('Посуда'),
       ('Игры'),
       ('Животные'),
       ('Журналы');

ALTER TABLE offers
    DISABLE TRIGGER ALL;
INSERT INTO offers(title, description, type, sum, picture, user_id)
VALUES ('Продам отличную подборку фильмов на VHS.',
        'Мой дед не мог её сломать. Пользовались бережно и только по большим праздникам. Это настоящая находка для коллекционера! Две страницы заляпаны свежим кофе.',
        'OFFER', 32931, 'item12.jpg', 1);
ALTER TABLE offers
    ENABLE TRIGGER ALL;

ALTER TABLE offer_categories
    DISABLE TRIGGER ALL;
INSERT INTO offer_categories(offer_id, category_id)
VALUES (1, 6);
ALTER TABLE offer_categories
    ENABLE TRIGGER ALL;

ALTER TABLE comments
    DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, user_id, offer_id)
VALUES ('Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца.', 1, 1);
ALTER TABLE comments
    ENABLE TRIGGER ALL;
