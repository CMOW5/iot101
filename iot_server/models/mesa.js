var dbconnection = require('../database/connection');
var DataTypes = dbconnection.DataTypes;

const Mesa = dbconnection.define('mesa', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    validate: {
      isInt: true, // checks for valid integers
    },
  },
  estado: {
    type: DataTypes.ENUM(
      'disponible', 
      'solicitando_servicio', 
      'pedido_tomado', 
      'no_disponible',
      'atendido', 
      'alarma')
  },
  // define the table's name
  // tableName: 'mesas',
  
},{
  timestamps: false,
});

module.exports = Mesa;