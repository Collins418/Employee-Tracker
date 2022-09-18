# Employee-tracker

## Description
```
`Your Challenge this week is to build a command-line application ``
from scratch to manage
 a company's employee database, using Node.js, Inquirer, and MySQL2. `Developers frequently have to create interfaces that allow non-developers to easily view` 
 and interact with information stored in databases. `
 `These interfaces are called content management systems (CMS).`
© 2020 - 2022 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
```


## Table of Contents

Please use the links in the table below to navigate the ReadMe contents.

- [Employee-tracker](#Employee-tracker)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [User Story](#user-story)
      - [Summary](#summary)
  - [Installation](#installation)
  - [Website](#website)
  - [Deployed on](#deployed-on)


## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

  Demo of the application Video and deploy link *

#### Summary 
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Installation
```
1. Run `npm install` before using. This application uses:  [Inquirer](https://www.npmjs.com/package/inquirer),[MySQL2 package](https://www.npmjs.com/package/mysql2)and [console.table package](https://www.npmjs.com/package/console.table).
2. Set up the database using the files found in [`sql`](./sql). A [`seed.sql`](./sql/seed.sql) file is provided for dummy data.
3. Configure the `user` and `password` properties found in [`connectionDetails.js`](./assets/constants/connectionDetails.js).
```

## Website
- [Node.js](https://nodejs.org/en/)
- [MySQL2 package](https://www.npmjs.com/package/mysql2)
- [Inquirer package](https://www.npmjs.com/package/inquirer)
- [console.table package](https://www.npmjs.com/package/console.table)

## Deployed on
- 