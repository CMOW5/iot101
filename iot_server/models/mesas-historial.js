const dbconnection = require('../database/connection');
const DataTypes = dbconnection.DataTypes;

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
      model: 'mesa',
      key: 'id',
    },
  },
  from: {
    type: DataTypes.ENUM(
      'disponible',
      'solicitando_servicio',
      'pedido_tomado',
      'no_disponible',
      'atendido',
      'alarma'),
  },
  to: {
    type: DataTypes.ENUM(
      'disponible',
      'solicitando_servicio',
      'pedido_tomado',
      'no_disponible',
      'atendido',
      'alarma'),
  },
  timeDiff: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'mesasHistorial',
});

module.exports = MesaHistorial;
