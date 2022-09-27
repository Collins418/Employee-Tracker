//const mysql = require('mysql');
//const inquirer = require('inquirer');//

//const connection = mysql.createConnection({
  //host: 'localhost',
  //user: 'root',
 // password: '',
  //database: 'employee-trackerdb'
//});


//const connection = mysql.createConnection({
 //host: 'localhost',
 // port: 3306,
  //user: 'root',
// Insert your MySQL password here between the tick marks, otherwise the application will not work!!!!!
 // password: '',
 //database: 'employee-trackerdb',
//});

//connection.connect((err) => {
  //if (err) {
  //  console.error('error connecting: ' + err.stack);
  //  return;
  //}

 // console.log('connected as id ' + connection.threadId);
//});

//prompt area
function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "Select a table you might want to perform activities on",
    name: "choice",
    choices: [
              "View All Employees?", 
              "View All Employee's By Roles?",
              "View all Emplyees By Deparments", 
              "Update Employee",
              "Add Employee?",
              "Add Role?",
              "Add Department?"
            ]
    }
]).then(function(val) {
        switch (val.choice) {
            case "View All Employees?":
              viewAllEmployees();
            break;
    
          case "View All Employee's By Roles?":
              viewAllRoles();
            break;
          case "View all Emplyees By Deparments":
              viewAllDepartments();
            break;
          
          case "Add Employee?":
                addEmployee();
              break;

          case "Update Employee":
                updateEmployee();
              break;
      
            case "Add Role?":
                addRole();
              break;
      
            case "Add Department?":
                addDepartment();
              break;
    
            }
    });
}
//Employee area all
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
  });
}
//= Roles area ALL
function viewAllRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
  if (err) throw err;
  console.table(res);
  startPrompt();
  });
}
//Dept area ALL
function viewAllDepartments() {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

//add role area
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  });
  return roleArr;
}
//add employee area
var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }
    
  });
  return managersArr;
}
//add employee area
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "What is the first name of the employee? ",
          validate : (name) =>
        !name ? 'OH NO! First name cannot be empty!'
        : name.length > 30 ? 'First name have too many characters. (Max length: 30 characters)'
        : true,
      filter: name => name.trim(),
        },
        {
          name: "lastname",
          type: "input",
          message: "What is the last name of the employee? ter their last name ",
          validate: (name) =>
        !name ? 'OH NO !Last name cannot be empty!'
        : name.length > 30 ? 'Last name have too many characters. (Max length: 30 characters)'
        : true,
      filter: name => name.trim(),
        },
        {
          name: "role",
          type: "list",
          message: "Please name the role of the employee ?at is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Please list the employee's manager here?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1;
      var managerId = selectManager().indexOf(val.choice) + 1;
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err;
          console.table(val);
          startPrompt();
      });

  });
}
//update employee area
  function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err;
     console.log(res);
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What new role would you like to give? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1;
        connection.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
           
        }, 
        {
          role_id: roleId
           
        }, 
        function(err){
            if (err) throw err;
            console.table(val);
            startPrompt();
        });
  
    });
  });

  }
//add role employee
function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: 'What is the title of the new role?',
          validate: title => !title ? 'OH NO! Role title cannot be empty!'
            : title.length > 30 ? 'Role title have too many characters. (Max length: 30 characters)'
            : true,
          filter: title => title.trim(),
        },
        {
          name: "Salary",
          type: "input",
          message: 'Insert salary of the new role?',
          validate: salary => {
            if (salary) {
              if (salary < 0) {
                return 'OH NO !Salary cannot be negative.';
              } else if (salary > 99999999.99) {
                return 'OH NO! Salary is too long (Max salary: 99999999.99)';
              } else {
                return true;
              }
            } else {
              return 'Reminder! Salary must be a number!';
            }
          },
          filter: salary => salary ? salary.toFixed(2) : '',
        },

    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err;
                console.table(res);
                startPrompt();
            }
        );

    });
  });
}
//add dept
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: 'What is the name of the new department?',
          validate: name =>
        !name ? 'OH NO! Department name cannot be empty!'
        : name.length > 30 ? 'Department name have too many characters. (Max length: 30 characters)'
        : true,
      filter: name => name.trim(),
    }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err;
                console.table(res);
                startPrompt();
            }
        );
    });
  }

 // module.exports = init();//
