const mysql = require('mysql');
const inquirer = require('inquirer');

const menuPrompt = () => {
    inquirer
      .prompt({
        name: 'menu',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
          'Add departments',
          'View departments',
          'Remove department',
          'Add a role',
          'View all roles',
          'Remove a role',
          'View all employees',
          'Add an employee',
          'Remove an employee',
          'Update employee roles',
          'Update employee manager',
          'Leave',
        ],
      })
      .then((answer) => {
        switch (answer.menu) {
          case 'Add departments':
            departmentAdd();
            break;
          case 'View departments':
            departmentView();
            break;
          case 'Remove department':
            departmentRemove();
            break;
          case 'Add a role':
            roleAdd();
            break;
          case 'View all roles':
            roleView();
            break;
          case 'Remove a role':
            roleRemove();
            break;
          case 'View all employees':
            employeeView();
            break;
          case 'Add an employee':
            employeeAdd();
            break;
          case 'Remove an employee':
            employeeRemove();
            break;
          case 'Update employee roles':
            UpdateEmployeeRoles();
            break;
          case 'Update employee manager':
            updateEmployeeManager();
            break;
          case 'Leave':
            endConnection();
            break;
        }
      });
    
    };
    //dept area
    
    
    // VIEW ALL DEPARTMENTS 
    const departmentView = () => {
      console.log('Loading all departments...\n');
      connection.query("SELECT * FROM department;", (err,res) => {
        if (err) throw err;
        console.table(res);
        menuPrompt();
      });
    };
    
    
    
    
    // ADD A DEPARTMENT
    const departmentAdd = () => {
      inquirer
      .prompt([
        {
          name: "addDepartment",
          type: "input",
          message: "Please enter your New Department name.",
        },
      ])
      .then((answer) => {
        connection.query('INSERT INTO department SET?;',{
          name: answer.addDepartment,
        }, (err, res) => {
            if (err) throw err;
            console.log(` \n The "${answer.addDepartment}" department has been added!!!\n`);
           menuPrompt();
          }
        );
      });
    };
    
    
    
    
    
    
    // REMOVE A DEPARMENT
    const departmentRemove = () => {
      connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        let deleteDepartment = res.map((department) => ({
          name: `${department.name}`,
          value: department.id,
        }));
        inquirer
          .prompt([
            {
              name: "department",
              type: "rawlist",
              message: "What department would you like to remove? (USE ID NUMBER)",
              choices: deleteDepartment,
            },
          ])
          .then((answer) => {
            connection.query(
              "DELETE FROM department WHERE ?",
              {
                id: answer.department,
              },
    
              (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} department deleted!\n`);
                menuPrompt();
              }
            );
          });
      });
    }
    
    
    /* ----------  ROLES SECTION ---------- */
    
    // VIEW ALL ROLES 
    const roleView = () => {
      console.log('Loading all employee roles...\n');
      connection.query("SELECT * FROM roles;", (err,res) => {
        if (err) throw err;
        console.table(res);
        menuPrompt();
      });
    };
    
    
    
    
    
    
    // ADD A DEPARTMENT
    const roleAdd = () => {
      connection.query("SELECT * FROM department", (err, departments) => {
        if (err) throw err;
        let newDepartment = departments.map((department) => ({
          name: `${department.name}`,
          value: department.id,
        }));
        inquirer
          .prompt([
            {
              name: "roleName",
              type: "input",
              message: "Please enter your Role name.",
            },
            {
              name: "salary",
              type: "input",
              message: "Please enter salary.",
            },
            {
              name: "department",
              type: "rawlist",
              message: "What department is your role in?",
              choices: newDepartment,
            },
          ])
          .then((answer) => {
            connection.query(
              "INSERT INTO roles SET ?",
              {
                title: answer.roleName,
                salary: answer.salary,
                department_id: answer.department,
              },
    
              (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} role inserted!\n`);
                menuPrompt();
              }
            );
          });
      });
    };
    
    
    
    
    
    
    // REMOVE A ROLE
    const roleRemove = () => {
      connection.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;
        let deleteroles = res.map((role) => ({
          name: `${role.title}`,
        }));
        inquirer
          .prompt([
            {
              name: "roles",
              type: "rawlist",
              message: "What role would you like to remove?",
              choices: deleteroles,
            },
          ])
          .then((answer) => {
            connection.query(
              "DELETE FROM roles WHERE ?",
              {
                title: answer.roles,
              },
    
              (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} role deleted!\n`);
                menuPrompt();
              }
            );
          });
      });
    }
    
    
    
    
    
    /* ---------- EMPLOYEE SECTION ---------- */
    
    
    //VIEW EMPLOYEES
    
    const employeeView = () => {
      console.log('Loading all employees...\n');
      connection.query("SELECT * FROM employee;", (err,res) => {
        if (err) throw err;
        console.table(res);
        menuPrompt();
      });
    };
    
    
    
    
    
    
    // ADD EMPLOYEE
    
    const employeeAdd = () => {
      connection.query("SELECT * FROM roles", (err, roles) => {
          if (err) throw err;
          let newRoles = roles.map((role) => ({
              name: role.title,
              value: role.id,
          }));
          connection.query("SELECT * FROM employee", (err, managers) => {
              if (err) throw err;
              let newManager = managers.map((manager) => ({
                  name: `${manager.first_name} ${manager.last_name}`,
                  value: manager.id,
              }));
              inquirer
                  .prompt([{
                          name: 'firstName',
                          type: 'input',
                          message: "What is the employee's first name?",
                          validate: answer => {
                              if (answer !== "") {
                                  return true;
                              } else {
                                  return "Please enter at least one Character.";
                              }
                          }
                      },
                      {
                          name: 'lastName',
                          type: 'input',
                          message: "What is the employee's last name?",
                          validate: answer => {
                              if (answer !== "") {
                                  return true;
                              } else {
                                  return "Please enter at least one Character.";
                              }
                          }
                      },
                      {
                          name: 'role',
                          type: 'list',
                          message: "What is the employee's role?",
                          choices: newRoles,
                      },
                      {
                          name: 'manager',
                          type: 'list',
                          message: "Who is the employee's manager?",
                          choices: newManager,
                      }
                  ]).then((answer) => {
                      connection.query(
                          'INSERT INTO employee SET ?', {
                              first_name: answer.firstName,
                              last_name: answer.lastName,
                              role_id: answer.role,
                              manager_id: answer.manager,
                          },
                          (err, res) => {
                              if (err) throw err;
                              console.log(`${res.affectedRows} employee added!\n`);
    
                              menuPrompt();
                          }
                      )
                  })
          })
      })
    };
    
    
    
    
    
    // REMOVE AN EMPLOYEE
    
    const employeeRemove = () => {
      connection.query("SELECT * FROM employee", (err, employees) => {
        if (err) throw err;
        let deleteEmployee = employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
        inquirer
          .prompt([
            {
              name: "employee",
              type: "rawlist",
              message: "Which employee would you like to remove?",
              choices: deleteEmployee,
            },
          ])
          .then((answer) => {
            connection.query(
              "DELETE FROM employee WHERE ?",
              {
                id: answer.employee,
              },
    
              (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} employee deleted from database!\n`);
                menuPrompt();
              }
            );
          });
      });
    };
    
    
    
    
    
    
    
    
    
    // UPDATE EMPLOYEE ROLES
    
    const UpdateEmployeeRoles = () => {
      connection.query("SELECT * FROM roles", (err, roles) => {
        if (err) throw err;
        let newRoles = roles.map((role) => ({
          name: role.title,
          value: role.id,
        }));
    
        connection.query("SELECT * FROM employee", (err, employees) => {
          if (err) throw err;
          let newEmployee = employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          }));
          inquirer
            .prompt([
              {
                name: "employee",
                type: "rawlist",
                message: "Which employee do you want to update?",
                choices: newEmployee,
              },
              {
                name: "role",
                type: "rawlist",
                message: "What is the employees new role?",
                choices: newRoles,
              },
            ])
            .then((answer) => {
              connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                  {
                    role_id: answer.role,
                  },
                  {
                    id: answer.employee,
                  },
                ],
                (err, res) => {
                  if (err) throw err;
                  console.log(`${res.affectedRows} new role's inserted!\n`);
                  menuPrompt();
                }
              );
            });
        });
      });
    };
    
    
    const updateEmployeeManager = () => {
      connection.query("SELECT * FROM employee", (err, managers) => {
        if (err) throw err;
        let newManagers = managers.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
        }));
    
        connection.query("SELECT * FROM employee", (err, employees) => {
          if (err) throw err;
          let newEmployee = employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          }));
          inquirer
            .prompt([
              {
                name: "employee",
                type: "rawlist",
                message: "Which employee do you want to update?",
                choices: newEmployee,
              },
              {
                name: "manager",
                type: "rawlist",
                message: "What is the employees new manager?",
                choices: newManagers,
              },
            ])
            .then((answer) => {
              connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                  {
                    manager_id: answer.manager,
                  },
                  {
                    id: answer.employee,
                  },
                ],
                (err, res) => {
                  if (err) throw err;
                  console.log(`${res.affectedRows} new manager inserted!\n`);
                  console.table(res);
                  menuPrompt();
                }
              );
            });
        });
      });
    };
    
    
    
    /* ---------- ENDS CONNECTION TO DB ---------- */
    //End Connection to DB
    const endConnection = () => {
      console.log('\n');
      console.log('Connection ended, have a great day!!!!\n');
      connection.end();
    };
    
    
    
    
    connection.connect((err) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      menuPrompt();
    });

