CREATE TABLE IF NOT EXISTS authors (
    author_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS books (
    book_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(70),
    year_of_publication INT(4),
    pages INT(4),
    description VARCHAR(255),
    clicked INT(10) NOT NULL DEFAULT 0,
    wishful INT(10) NOT NULL DEFAULT 0,
    deleted TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS books_authors_id (
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors (author_id) ON DELETE CASCADE
);