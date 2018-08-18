const Sequelize = require('sequelize');
const dbconfig = require('../config/database.js');

const dbconnection = new Sequelize('allix_iot_restaurante', 'root', '', {
  host: dbconfig.development.host,
  dialect: dbconfig.development.dialect,
  port: dbconfig.development.port,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

dbconnection.DataTypes = Sequelize;

module.exports = dbconnection;
