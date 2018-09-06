const dbconnection = require('../database/connection');
const DataTypes = dbconnection.DataTypes;

const DbConfig = dbconnection.define('dbconfig', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isInt: true, // checks for valid integers
    },
  },
  wifiNetwork: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  wifiPassword: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  mqttServer: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  mqttPort: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 1883,
  },
  mqttUser: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  mqttKey: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

/**
 * update the app config
 * @param {number} mesaId
 * @param {string} newState
 */
DbConfig.update = async function(configData) {
  console.log('updating config with data = ', configData);
  const config = await this.findAll();
  if (config.length > 0) {
    return config[0].update(configData);
  } else {
    return this.create(configData);
  }
};

/**
 * get the app config
 * @param {number} mesaId
 * @param {string} newState
 */
DbConfig.get = async function() {
  const config = await this.findAll();
  if (config.length > 0) {
    return config[0];
  } else {
    return null;
  }
};

module.exports = DbConfig;
