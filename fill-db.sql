
      INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
      ('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');

      INSERT INTO categories(name) VALUES
      ('Книги'),
('Разное'),
('Посуда'),
('Игры'),
('Животные'),
('Журналы');

      ALTER TABLE offers DISABLE TRIGGER ALL;
      INSERT INTO offers(title, description, type, sum, picture, user_id) VALUES
      ('Куплю антиквариат.', 'Товар в отличном состоянии. Это настоящая находка для коллекционера! Даю недельную гарантию. Мой дед не мог её сломать.', 'OFFER', 55834, 'item11.jpg', 2);
      ALTER TABLE offers ENABLE TRIGGER ALL;

      ALTER TABLE offer_categories DISABLE TRIGGER ALL;
      INSERT INTO offer_categories(offer_id, category_id) VALUES
      (1, 2);
      ALTER TABLE offer_categories ENABLE TRIGGER ALL;

      ALTER TABLE comments DISABLE TRIGGER ALL;
      INSERT INTO COMMENTS(text, user_id, offer_id) VALUES
      ('А где блок питания? Оплата наличными или перевод на карту? Совсем немного...', 1, 1),
('Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте? Неплохо но дорого', 1, 1);
      ALTER TABLE comments ENABLE TRIGGER ALL;