const Sequelize = require('sequelize');

const dbconnection = new Sequelize('allix_iot_restaurante', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

dbconnection.DataTypes = Sequelize;

module.exports = dbconnection;