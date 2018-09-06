'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dbconfig', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      wifiNetwork: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      wifiPassword: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      mqttServer: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      mqttPort: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 1883,
      },
      mqttUser: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      mqttKey: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: '',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dbconfig');
  },
};
