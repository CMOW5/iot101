'use strict';

const socketService = require('../socket/socket-service');
const mqttService = require('./mqtt-service');
const mqttClient = mqttService.client;

/* repositories */
const Mesa = require('../../models/mesa');

/* mqtt configuration */
module.exports = (app) => {
  /* mqtt init */
  mqttClient.on('connect', function() {
    // connect to the database and read the ids of the mesas
    // to establish the mqtt topics
    Mesa.findAll().then((mesas) => {
      mesas.forEach((mesa) => {
        mqttService.subscribeToMesa(mesa.id);
      });
    });
  });

  /* mqtt messages handlers */
  mqttClient.on('message', function(topic, message) {
    console.log('topic = ', topic);
    console.log('message = ', message.toString());

    if (mqttService.isStateChangeTopic(topic)) {
      const mesaId = mqttService.getMesaIdFromTopic(topic);
      console.log('mesa to update = ', mesaId);

      const newState = message.toString();

      Mesa.updateMesaState(mesaId, newState)
        .then((mesaHistorial) => {
          socketService.sendStateChange(mesaId, newState);
          console.log('mesa successfully updated');
        })
        .catch((error) => {
          console.log('error updating mesa', error);
        });
    }

    if (mqttService.isLoadDataTopic(topic)) {
      console.log('cargar datos desde el servidor');
      const mesaId = mqttService.getMesaIdFromTopic(topic);

      Mesa.findById(mesaId).then((mesa) => {
        const newState = mesa.state;
        console.log('estado a enviar = ', newState);
        mqttService.changeMesaState(mesaId, newState);
      });
    }
  });

  /* sockets messages handlers */
  socketService.addListener('test channel', function(msg) {
    console.log('message executed: ' + msg);
  });

  /* sockets messages handlers */
  socketService.addListener('state_change', function({mesaId, newState}) {
    console.log('new state from socket: ', mesaId, newState);
    Mesa.updateMesaState(mesaId, newState)
      .then((mesaHistorial) => {
        mqttService.changeMesaState(mesaId, newState);
        console.log('mesa successfully updated');
      })
      .catch((error) => {
        console.log('error updating mesa', error);
      });
  });
};
