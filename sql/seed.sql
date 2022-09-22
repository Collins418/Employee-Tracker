USE employee_db;

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