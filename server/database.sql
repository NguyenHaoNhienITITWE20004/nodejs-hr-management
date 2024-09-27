CREATE DATABASE hr_management;
USE hr_management;

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    position VARCHAR(50),
    salary DECIMAL(10, 2),
    hire_date DATE
);
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
SHOW TABLES;

SELECT * FROM employees;
