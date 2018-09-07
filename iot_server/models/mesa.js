const dbconnection = require('../database/connection');
const DataTypes = dbconnection.DataTypes;

/* utils */
const moment = require('moment');

/* repositories */
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
      'alarma'),
  },
}, {
  timestamps: true,
});

Mesa.states = {
  disponible: 'disponible',
  solicitandoServicio: 'solicitando_servicio',
  pedidoTomado: 'pedido_tomado',
  noDisponible: 'no_disponible',
  atendido: 'atendido',
  alarma: 'alarma'
}

// relationships
Mesa.hasMany(MesaHistorial, {
  as: 'History', 
  onDelete: 'cascade', 
  onUpdate: 'cascade',
  hooks: true
});

/**
 * update the mesa state with the given id
 * @param {number} mesaId
 * @param {string} newState
 */
Mesa.updateMesaState = async function(mesaId, newState) {
  const mesa = await this.findById(mesaId);
  const timeDiff = calculateTimeDiff(mesa.updatedAt);
  const fromState = mesa.state;

  mesa.state = newState; // update the current mesa state

  return Promise.all([
    MesaHistorial.create({
      mesaId: mesa.id,
      from: fromState,
      to: newState,
      timeDiff: timeDiff,
    }),
    mesa.save(),
  ]);
};

/**
 * calculates the time difference between the given
 * time and the current time
 *
 * @param {*} stateTime
 * @return {number} the time difference in hours
 */
function calculateTimeDiff(stateTime) {
  let now = moment();
  let duration = moment.duration(now.diff(stateTime));
  return duration.asHours();
}

module.exports = Mesa;
