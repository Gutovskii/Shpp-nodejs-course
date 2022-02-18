DROP TABLE IF EXISTS books_authors_id;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;

CREATE TABLE authors (
    author_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(30)
);

INSERT INTO authors(author_name) VALUES('Андрей Богуславский');
INSERT INTO authors(author_name) VALUES('Марк Саммерфильд');
INSERT INTO authors(author_name) VALUES('Дэвид Флэнаган');
INSERT INTO authors(author_name) VALUES('Уэс Маккинни');
INSERT INTO authors(author_name) VALUES('Брюс Эккель');
INSERT INTO authors(author_name) VALUES('Гэри Маклин Холл');
INSERT INTO authors(author_name) VALUES('Люк Веллинг');
INSERT INTO authors(author_name) VALUES('Джереми Блум');
INSERT INTO authors(author_name) VALUES('Сэмюэл Грингард');
INSERT INTO authors(author_name) VALUES('Сет Гринберг');
INSERT INTO authors(author_name) VALUES('Сергей Мастицкий');
INSERT INTO authors(author_name) VALUES('Джон Вудкок');
INSERT INTO authors(author_name) VALUES('Александр Сераков');
INSERT INTO authors(author_name) VALUES('Тим Кедлек');

CREATE TABLE books (
    book_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(70),
    year_of_publication INT(4),
    pages INT(4),
    description VARCHAR(255),
    clicked INT(10) NOT NULL DEFAULT 0,
    wishful INT(10) NOT NULL DEFAULT 0,
    deleted TINYINT NOT NULL DEFAULT 0
);

INSERT INTO books(title, year_of_publication, pages, description) VALUES('Си++ и компьютерная графика', 2003, 351, 'Лекции и практикум по программированию на Си++');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('Программирование на языке Go', 2015, 198, 'Книга про Go');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('Python for Data Analysis', 2010, 69, 'Книга про Python для анализа данных');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('Thinking of Java (4th Edition)', 2012, 212, 'Книга про Философию Java, 4-ое издание');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('JavaScript Pocket Reference', 2009, 253, 'Книга про JavaScript');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('Adaptive Code via C#', 2013, 352, 'Книга про C#');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('PHP and MySQL Web Development', 2012, 158, 'Книга про PHP и MySQL');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('Статический анализ и визуализация данных с помощью R', 2008, 176, 'Название говорит само за себя');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('The Internet of Things', 2015, 145, 'Книга про Интернет Вещей');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('Sketching User Experience', 2011, 73, 'Книга про создание хорошего UX');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('InDesign CS6', 2003, 192, 'Книга про программу InDesign CS6');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('Адаптивный дизайн', 2015, 97, 'Книга про адаптивный дизайн');
INSERT INTO books(title, year_of_publication, pages, description) VALUES('Computer coding for kids', 2000, 500, 'Книга про компьютерный кодинг для детей');

CREATE TABLE books_authors_id (
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors (author_id) ON DELETE CASCADE
);

INSERT INTO books_authors_id VALUES(1, 1);
INSERT INTO books_authors_id VALUES(2, 2);
INSERT INTO books_authors_id VALUES(3, 4);
INSERT INTO books_authors_id VALUES(4, 5);
INSERT INTO books_authors_id VALUES(5, 3);
INSERT INTO books_authors_id VALUES(6, 6);
INSERT INTO books_authors_id VALUES(7, 7);
INSERT INTO books_authors_id VALUES(8, 11);
INSERT INTO books_authors_id VALUES(9, 9);
INSERT INTO books_authors_id VALUES(10, 10);
INSERT INTO books_authors_id VALUES(11, 13);
INSERT INTO books_authors_id VALUES(12, 14);
INSERT INTO books_authors_id VALUES(13, 12);