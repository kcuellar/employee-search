DROP TABLE IF EXISTS employee;

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    job_title VARCHAR(50) NOT NULL,
    age INT(8) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE
);

