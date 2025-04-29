-- Active: 1745409352670@@127.0.0.1@3306@rent_stadium



CREATE DATABASE rent_stadium;

SHOW DATABASES


SHOW TABLES

DROP TABLE users

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role` ENUM('owner', 'customer','admin') NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255),
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL
);
CREATE TABLE `stadium`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(50) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(15,2) NOT NULL,
    `owner_id` INT NOT NULL
);

DROP TABLE booking

CREATE TABLE `booking`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `booking_date` DATE NOT NULL,
    `start_time` VARCHAR(10) NOT NULL,
    `end_time` VARCHAR(10) NOT NULL,
    `total_price` DECIMAL(15,2) NOT NULL,
    `status` ENUM('PENDING', 'CANCELLED', 'CONFIRMED', 'PAID') NOT NULL
);
CREATE TABLE `payment`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `booking_id` BIGINT UNSIGNED NOT NULL,
    `amount` DECIMAL(15,2) NOT NULL,
    `payment_time` DATETIME NOT NULL,
    `payment_method` ENUM('CARD', 'CASH', 'ONLINE') NOT NULL 
);
CREATE TABLE `review`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `rating` SMALLINT NOT NULL,
    `comment` VARCHAR(255) NOT NULL
);
CREATE TABLE `images`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` BIGINT  UNSIGNED NOT NULL,
    `image_url` VARCHAR(255) NOT NULL
);



SHOW TABLES

SELECT * FROM users

SELECT u.first_name, u.phone, f.name, i.image_url
FROM users u
    LEFT JOIN field f ON u.id = f.owner_id
    LEFT JOIN images i ON f.id = i.stadion_id
WHERE
    first_name = "john"
    and last_name = ""

SELECT u.first_name, u.last_name, f.name, b.booking_date
FROM booking b
    LEFT JOIN field f ON b.stadion_id = f.id
    LEFT JOIN user u ON b.user_id = u.id
WHERE
    b.booking_date BETWEEN "2025-01-01" AND "2025-06-01"
    AND s.name LIKE '%ARENA%'






DROP PROCEDURE IF EXISTS getAllUsers

CREATE PROCEDURE IF NOT EXISTS getAllUsers()
BEGIN
    SELECT * FROM users;
END

call getAllUsers()

--IN, OUT, INOUT
CREATE PROCEDURE IF NOT EXISTS getUsersById(IN userId INT)
BEGIN
   SELECT * FROM users WHERE id = userId;
END

call getUsersById(1)


CREATE PROCEDURE IF NOT EXISTS getUserName(IN userId INT, OUT userName VARCHAR(50))
BEGIN
    SELECT first_name into userName FROM users WHERE id = userId;
END

call `getUserName`(1, @userName)

SELECT @userName

CREATE PROCEDURE IF NOT EXISTS res_out(INOUT res INT)
BEGIN
    SET res=res-10;
END
SET @res=100

CALL res_out(@res)

SELECT @res


DROP FUNCTION IF EXISTS MmyFunc1

CREATE FUNCTION IF NOT EXISTS myFunc1() RETURNS INT DETERMINISTIC
BEGIN 
    DECLARE sum INT DEFAULT 0;
    SELECT COUNT(*) into sum FROM stadium;
    RETURN sum;
END

SELECT `myFunc1`()