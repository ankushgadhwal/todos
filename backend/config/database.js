const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todo", "root", "admin123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;