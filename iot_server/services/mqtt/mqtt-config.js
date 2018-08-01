'use strict';

const socketService = require('../socket/socket-service');
const mqttService = require('./mqtt-service');
const mqttClient = mqttService.client;

/* repositories */
const Mesa = require('../../models/mesa');
const MesaHistorial = require('../../models/mesas-historial');

/* utils */
const moment = require('moment');


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

      Mesa.findById(mesaId)
        .then((mesa) => {
          let end = mesa.updatedAt;
          let now = moment();
          let duration = moment.duration(now.diff(end));
          let hours = duration.asHours();
          const fromState = mesa.state;

          mesa.state = newState;

          return Promise.all([
            MesaHistorial.create({
              mesaId: mesa.id,
              from: fromState,
              to: newState,
              timeDiff: hours,
            }),
            mesa.save(),
          ]);
        }).then((mesaHistorial) => {
          socketService.sendStateChange(mesaId, newState);

          // socketService.sendNotification('state_change', {value: newState});
          console.log('mesa updated');
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

    // save the new state in the db
    Mesa.findById(mesaId)
      .then((mesa) => {
        let end = mesa.updatedAt;
        let now = moment();
        let duration = moment.duration(now.diff(end));
        let hours = duration.asHours();
        const fromState = mesa.state;

        mesa.state = newState;

        return Promise.all([
          MesaHistorial.create({
            mesaId: mesa.id,
            from: fromState,
            to: newState,
            timeDiff: hours}),
          mesa.save(),
        ]);
      }).then((mesaHistorial) => {
        mqttService.changeMesaState(mesaId, newState);
        console.log('mesa updated');
      });
  });
};
