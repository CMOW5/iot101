'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mesasHistorial', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mesaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mesas',
          key: 'id',
        },
      },
      from: {
        type: Sequelize.ENUM(
          'disponible',
          'solicitando_servicio',
          'pedido_tomado',
          'no_disponible',
          'atendido',
          'alarma'),
      },
      to: {
        type: Sequelize.ENUM(
          'disponible',
          'solicitando_servicio',
          'pedido_tomado',
          'no_disponible',
          'atendido',
          'alarma'),
      },
      timeDiff: {
        type: Sequelize.DOUBLE,
        // type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MesasHistorial');
  },
};
