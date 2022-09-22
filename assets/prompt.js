//program prompt
const inquirer =require('inquirer');
const mainMenuChoice = require('./constants/mainMenuChoice.js');

const [DEPARTMENT_TABLE, ROLE_TABLE, EMPLOYEE_TABLE] = mainMenuChoice.tables;
const QUIT = mainMenuChoice.quit;

// all prompt functions 
const prompts = {};

//Main Menu area
prompts.mainMenu = async () => {
  const mainMenuChoice = await inquirer.prompt([
    {
      type: 'list',
      name: 'table',
      message: 'Select a table you might want to perform activities on:',
      choices: [...mainMenuChoice.tables,
        new inquirer.Separator(),
        QUIT,
      ],
    },
    {
      type: 'list',
      name: 'action',
      message: `How might you want to manage ${DEPARTMENT_TABLE}?`,
      choices: [...mainMenuChoice.departmentActions,
        new inquirer.Separator(),
        QUIT,
      ],
      when: currentAnswers => currentAnswers.table === DEPARTMENT_TABLE,
    },
    {
      type: 'list',
      name: 'action',
      message: `How might you want to manage ${ROLE_TABLE}?`,
      choices: [...mainMenuChoice.roleActions,
        new inquirer.Separator(),
        QUIT,
      ],
      when: currentAnswers => currentAnswers.table === ROLE_TABLE,
    },
    {
      type: 'list',
      name: 'action',
      message: `How might you want to manage ${EMPLOYEE_TABLE}?`,
      choices: [...mainMenuChoice.employeeActions,
        new inquirer.Separator(),
        QUIT,
      ],
      when: currentAnswers => currentAnswers.table === EMPLOYEE_TABLE,
    },
  ]);
  return mainMenuChoice.table === QUIT ? mainMenuChoice.table : mainMenuChoice.action;
}

//new dept area
prompts.askDepartmentInfo = async () => {
  const departmentInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the new department?',
      validate: name =>
        !name ? 'OH NO! Department name cannot be empty!'
        : name.length > 30 ? 'Department name have too many characters. (Max length: 30 characters)'
        : true,
      filter: name => name.trim(),
    }
  ]);
  return departmentInfo;
}

prompts.askDepartmentBudgetToView = async (departments) => {
  const departmentChoice = await inquirer.prompt([
    {
      type: 'list',
      name: 'toView',
      message: "Which department's utilized budget(spending plan) would you like to view?",
      choices: () => departments.map(department =>
        ({name: department.name, value: department})
      ),
    }
  ]);
  return departmentChoice.toView;
}

//deleting department info
prompts.askDeleteDepartment = async (departments) => {
  const departmentChoice = await inquirer.prompt([
    {
      type: 'list',
      name: 'toDelete',
      message: 'Would you like to delete a department, which one ?',
      choices: () => departments.map(department =>
        ({name: department.name, value: department})
      ),
    }
  ]);
  return departmentChoice.toDelete;
}

//new role create area
prompts.askRoleInfo = async (departments) => {
  const roleInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?',
      validate: title => !title ? 'OH NO! Role title cannot be empty!'
        : title.length > 30 ? 'Role title have too many characters. (Max length: 30 characters)'
        : true,
      filter: title => title.trim(),
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Insert salary of the new role?',
      validate: salary => {
        if (salary) {
          if (salary < 0) {
            return 'OH NO !Salary cannot be negative.';
          } else if (salary > 99999999.99) {
            return 'OH NO! Salary is too long (Max salary: 99999999.99)'
          } else {
            return true;
          }
        } else {
          return 'Reminder! Salary must be a number!';
        }
      },
      filter: salary => salary ? salary.toFixed(2) : '',
    },
    {
      type: 'list',
      name: 'department_id',
      message:'What office or department does this role belong to?',
      choices: () => departments.map(department =>
        ({name: department.name, value: department.id})
      ),
    }
  ]);
  return roleInfo;
}
//delete area
prompts.askDeleteRole = async (roles) => {
  const roleChoice = await inquirer.prompt([
    {
      type: 'list',
      name: 'toDelete',
      message: 'Would you like to delete a role, which one ?',
      choices: () => roles.map(role =>
        ({name: role.title, value: role})
      ),
    }
  ]);
  return roleChoice.toDelete;
}

//new employee create area
prompts.askEmployeeInfo = async (roles, employees) => {
  const employeeInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the employee?',
      validate: (name) =>
        !name ? 'OH NO! First name cannot be empty!'
        : name.length > 30 ? 'First name have too many characters. (Max length: 30 characters)'
        : true,
      filter: name => name.trim(),
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the employee?',
      validate: (name) =>
        !name ? 'OH NO !Last name cannot be empty!'
        : name.length > 30 ? 'Last name have too many characters. (Max length: 30 characters)'
        : true,
      filter: name => name.trim(),
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Please name the role of the employee ?',
      choices: () => roles.map(role =>
        ({name: role.title, value: role.id})
      ),
    },
    {
      type: 'list',
      name: 'manager_id',
      message: "Please list the employee's manager here?",
      choices: () => employees.map(employee =>
        {return {name: employee.first_name + ' ' + employee.last_name, value: employee.id }}
      ),
    }
  ]);
  return employeeInfo;
}

prompts.askManagerToView = async (managers) => {
  const managerChoice = await inquirer.prompt([
    {
      type: 'list',
      name: 'manager',
      message: "Which manager's employees would you like to view?",
      choices: () => managers.map(manager =>
        ({name: manager.name, value: manager})
      ),
    }
  ]);
  return managerChoice.manager;
}
//delete area
prompts.askDeleteEmployee = async (employees) => {
  const employeeChoice = await inquirer.prompt([
    {
      type: 'list',
      name: 'toDelete',
      message: 'Would you like to delete a employee, which one ?',
      choices: () => employees.map(employee =>
        ({name: employee.first_name + ' ' + employee.last_name, value: employee})
      ),
    }
  ]);
  return employeeChoice.toDelete;
}

//updating employee's role
prompts.askUpdateEmployeeRole = async (employees, roles) => {
  const updateEmployeeRoleInfo = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeToUpdate',
      message: "Which employee's role would you like to update?",
      choices: () => employees.map(employee =>
        ({
          name: `${employee.name}, ${employee.title}`,
          value: employee,
        })
      ),
    },

    {
      type: 'list',
      name: 'newRole',
      message: currentAnswers =>
        `What new role would you like to give ${currentAnswers.employeeToUpdate.name}?`,
      choices: () => roles.map(role =>
        ({name: role.title, value: role})
      ),
    },
  ]);
  return updateEmployeeRoleInfo;
}

prompts.askUpdateEmployeeManager = async (employees) => {
  const updateEmployeeManagerInfo = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeToUpdate',
      message: "Which employee's manager would you like to update?",
      choices: () => employees.map(employee =>
        ({
          name: `${employee.name}, Manager: ${employee.manager}`,
          value: employee,
        })
      ),
    },
    {
      type: 'list',
      name: 'newManager',
      message: currentAnswers =>
        `Which employee should be assigned as ${currentAnswers.employeeToUpdate.name}'s new manager?`,
      choices: currentAnswers =>
        
        employees.filter(employee => employee.id !== currentAnswers.employeeToUpdate.id)
        .map(employee =>
          ({
            name: employee.name,
            value: employee,
          })
        ),
    },
  ]);
  return updateEmployeeManagerInfo;
}

module.exports = prompt;