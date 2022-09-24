/* remember to capitalize and https://www.w3schools.com/sql/*/

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE role (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30) NOT NULL,
    `salary` DECIMAL(10,2) NOT NULL,
    `department_id` INTEGER,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`department_id`) 
		REFERENCES department(`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE employee (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `role_id` INTEGER,
    `manager_id` INTEGER,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`role_id`) 
		REFERENCES role(`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (`manager_id`) 
		REFERENCES employee(`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

INSERT INTO department(name)
	VALUES('Sales'),
		('Engineering'),
        ('Finance'),
        ('Legal');
        
INSERT INTO role(title, salary, department_id)
	VALUES('Sales Lead', 120000, 1),
		('Salesperson', 90000, 1),
        ('Lead Engineer', 160000, 2),
        ('Software Engineer', 128000, 2),
        ('Account Manager', 310000, 3),
        ('Accountant', 200000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer',180000, 4);

-- Manager area
INSERT INTO employee(first_name, last_name, role_id, manager_id)
	VALUES('Robbin', 'Collins', 1, NULL),
		('Austin', 'Smith', 3, NULL),
        ('Ryan', 'Avery', 5, NULL),
        ('Jennifer', 'Sweet', 7, NULL);

-- Employees area
INSERT INTO employee(first_name, last_name, role_id, manager_id)
	VALUES('Angela', 'Castro', 2, 1),
	('Faezana', 'Ali', 4, 2),
    ('Leslie', 'Davis', 6, 3),
    ('Simone', 'Bean', 8, 4);

 -- SELECTING FOR CREATING 
--TABLES IN OUR SQL WORKBENCH 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
