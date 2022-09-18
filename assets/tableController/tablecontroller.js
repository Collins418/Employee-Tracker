const mysql = require('mysql2/promise');

//table area
class tableController {
  constructor(name) {
    this.name = mysql.escapeId(name);
  }
}

tableController.prototype.setConnection = function(connection) {
  this.connection = connection;
}

tableController.prototype.checkConnection = function() {
  if (!this.connection) {
    throw new Error(`No connection set for tableController of: ${this.name}`);
  }
}

tableController.prototype.insert = async function(data) {
  try {
    this.checkConnection();
    const insertQuery = `INSERT INTO ${this.name} SET ?`;
    await this.connection.query(insertQuery, data);
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

tableController.prototype.selectAll = async function() {
  try {
    this.checkConnection();
    const selectQuery = `SELECT * FROM ${this.name}`;
    const [data] = await this.connection.query(selectQuery);
    //console.table(data);
    return data;
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

tableController.prototype.update = async function(set, identifier) {
  try {
    const updateQuery = `
      UPDATE ${this.name}
      SET ?
      WHERE ?`;
    this.checkConnection();
    await this.connection.query(updateQuery, [set, identifier]);
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

tableController.prototype.delete = async function(id) {
  try {
    const deleteQuery = `
      DELETE FROM ${this.name}
      WHERE ?
    `;
    this.checkConnection();
    await this.connection.query(deleteQuery, {id});
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = tableController;