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