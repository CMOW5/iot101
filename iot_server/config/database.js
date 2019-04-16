// const fs = require('fs');

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'allix_iot_restaurante',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    port: 3306,
  },
};
