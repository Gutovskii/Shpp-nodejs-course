/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: authors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `authors` (
  `author_id` int(11) NOT NULL AUTO_INCREMENT,
  `author_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: books
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `books` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(70) DEFAULT NULL,
  `year_of_publication` int(4) DEFAULT NULL,
  `pages` int(4) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `clicked` int(10) NOT NULL DEFAULT 0,
  `wishful` int(10) NOT NULL DEFAULT 0,
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`book_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: books_authors_id
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `books_authors_id` (
  `book_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`book_id`, `author_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `books_authors_id_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE,
  CONSTRAINT `books_authors_id_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: authors
# ------------------------------------------------------------

INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (1, 'Андрей Богуславский');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (2, 'Марк Саммерфильд');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (3, 'Дэвид Флэнаган');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (4, 'Уэс Маккинни');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (5, 'Брюс Эккель');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (6, 'Гэри Маклин Холл');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (7, 'Люк Веллинг');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (8, 'Джереми Блум');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (9, 'Сэмюэл Грингард');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (10, 'Сет Гринберг');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (11, 'Сергей Мастицкий');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (12, 'Джон Вудкок');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (13, 'Александр Сераков');
INSERT INTO
  `authors` (`author_id`, `author_name`)
VALUES
  (14, 'Тим Кедлек');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: books
# ------------------------------------------------------------

INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    1,
    'Си++ и компьютерная графика',
    2003,
    351,
    'Лекции и практикум по программированию на Си++',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    2,
    'Программирование на языке Go',
    2015,
    198,
    'Книга про Go',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    3,
    'Python for Data Analysis',
    2010,
    69,
    'Книга про Python для анализа данных',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    4,
    'Thinking of Java (4th Edition)',
    2012,
    212,
    'Книга про Философию Java, 4-ое издание',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    5,
    'JavaScript Pocket Reference',
    2009,
    253,
    'Книга про JavaScript',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    6,
    'Adaptive Code via C#',
    2013,
    352,
    'Книга про C#',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    7,
    'PHP and MySQL Web Development',
    2012,
    158,
    'Книга про PHP и MySQL',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    8,
    'Статический анализ и визуализация данных с помощью R',
    2008,
    176,
    'Название говорит само за себя',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    9,
    'The Internet of Things',
    2015,
    145,
    'Книга про Интернет Вещей',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    10,
    'Sketching User Experience',
    2011,
    73,
    'Книга про создание хорошего UX',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    11,
    'InDesign CS6',
    2003,
    192,
    'Книга про программу InDesign CS6',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    12,
    'Адаптивный дизайн',
    2015,
    97,
    'Книга про адаптивный дизайн',
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `book_id`,
    `title`,
    `year_of_publication`,
    `pages`,
    `description`,
    `clicked`,
    `wishful`,
    `deleted`
  )
VALUES
  (
    13,
    'Computer coding for kids',
    2000,
    500,
    'Книга про компьютерный кодинг для детей',
    1,
    1,
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: books_authors_id
# ------------------------------------------------------------

INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (1, 1);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (2, 2);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (3, 4);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (4, 5);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (5, 3);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (6, 6);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (7, 7);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (8, 11);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (9, 9);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (10, 10);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (11, 13);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (12, 14);
INSERT INTO
  `books_authors_id` (`book_id`, `author_id`)
VALUES
  (13, 12);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
