const tableController = require('./tablecontroller');

//For department
const deptController = new tableController('department');

deptController.selectWithAlias = async function() {
  try {
    this.checkConnection();
    const aliasQuery = `
    SELECT id AS ID, name as Department
    FROM ${this.name}`;
    const [departments] = await this.connection.query(aliasQuery);
    return departments;
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = deptController;