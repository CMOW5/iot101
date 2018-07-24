var dbconnection = require('../database/connection');
var DataTypes = dbconnection.DataTypes;

const MesaHistorial = dbconnection.define('mesaHistorial', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isInt: true, // checks for valid integers
    },
  },
  mesaId: {
    type: DataTypes.INTEGER,
    references: {
      model: "mesa",
      key: "id"
    }
  },
  from: {
    type: DataTypes.ENUM(
      'disponible', 
      'solicitando_servicio', 
      'pedido_tomado', 
      'no_disponible',
      'atendido', 
      'alarma')
  },
  to: {
    type: DataTypes.ENUM(
      'disponible', 
      'solicitando_servicio', 
      'pedido_tomado', 
      'no_disponible',
      'atendido', 
      'alarma')
  },
  timeDiff: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  // define the table's name
  // tableName: 'mesas',
  
},{
  timestamps: false,
  tableName: 'mesasHistorial',
});

module.exports = MesaHistorial;