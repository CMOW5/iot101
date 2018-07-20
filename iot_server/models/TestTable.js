'use strict';
module.exports = (sequelize, DataTypes) => {
  var Mesa = sequelize.define('mesa', {
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
  }, {
    timestamps: false,
  });

  Mesa.associate = function(models) {
    // associations can be defined here
  };

  Mesa.testfunct = function() {
    console.log('test function from mesa');
  }

  return Mesa;
};