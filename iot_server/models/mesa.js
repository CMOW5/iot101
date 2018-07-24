var dbconnection = require('../database/connection');
var DataTypes = dbconnection.DataTypes;

const MesaHistorial = require('./mesas-historial');

const Mesa = dbconnection.define('mesa', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isInt: true, // checks for valid integers
    },
  },
  state: {
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
  timestamps: true,
});

Mesa.hasMany(MesaHistorial, {as: 'History'});

module.exports = Mesa;