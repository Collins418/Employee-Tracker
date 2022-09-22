// remember to add to main menu /index and quit area 
const mainMenuChoice = {
    tables: ['Departments', 'Roles', 'Employees'],
    departmentActions: ['Add department', 'View departments', 'View utilized budget of a department', 'Delete department'],
    roleActions: ['Add role', 'View roles', 'Delete role'],
    employeeActions: ['Add employee', 'View employees', 'View employees by manager','Delete employee', 'Update employee role', 'Update employee manager'],
    quit: 'Quit',
  }
  
  module.exports = mainMenuChoice;