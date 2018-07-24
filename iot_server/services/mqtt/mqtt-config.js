'use strict';

const socketService = require('../socket/socket-service');
const mqttService = require('./mqtt-service');
const mqttClient = mqttService.client;

/* repositories */
var Mesa = require('../../models/mesa');
var MesaHistorial = require('../../models/mesas-historial'); 
var moment = require('moment');


/* mqtt configuration */ 
module.exports = (app) => {

  /* mqtt init */
  mqttClient.on('connect', function () {
    mqttClient.subscribe(mqttService.MQTT_FEED_CAMBIAR_ESTADO);
    mqttClient.subscribe(mqttService.MQTT_FEED_CARGAR_DATOS);
  });  

  /* mqtt messages handlers */
  mqttClient.on('message', function (topic, message) {
    console.log(topic);
    console.log(message.toString());
    
    if (topic === mqttService.MQTT_FEED_CAMBIAR_ESTADO) {
      const mesaId = 1; // find the mesa id here
      const newState = message.toString();
      /*
      mesa.state = newState;
      return mesa.save();
      .then(() => {
        // notify the front end that the mesa x has a new state y 
        socketService.sendNotification('state_change', {value: newState});
        console.log('mesa updated');
      });
      */
      
      Mesa.findById(mesaId)
        .then((mesa) => {
          let end = mesa.updatedAt;
          let now = moment();
          let duration = moment.duration(now.diff(end));
          let hours = duration.asHours();
          const fromState = mesa.state;
          
          mesa.state = newState;

          return Promise.all([
            MesaHistorial.create({mesaId: mesa.id, from: fromState, to: newState, timeDiff: hours}),
            mesa.save()
          ]);
        }).then((mesaHistorial) => {
          socketService.sendNotification('state_change', {value: newState});
          console.log('mesa updated');
        });


      // save the new state in the db
      /*
      Mesa.findById(mesaId)
          .then((mesa) => {    
            mesa.state = newState;
            return mesa.save();
      })
      .then(() => {
        // notify the front end that the mesa x has a new state y 
        socketService.sendNotification('state_change', {value: newState});
        console.log('mesa updated');
      });
      */
    }

    if (topic === mqttService.MQTT_FEED_CARGAR_DATOS) {
      console.log('cargar datos desde el servidor');
      const mesaId = 1; // find the mesa id here
      Mesa.findById(mesaId).then((mesa) => {
        const newState = mesa.state;
        console.log('estado a enviar = ', newState);
        mqttService.publish(mqttService.MQTT_ENVIAR_ESTADO, newState);
      });
    }
  });

  /* sockets messages handlers */
  socketService.addListener('chat message', function(msg) {
    console.log('message executed: ' + msg);
    mqttService.publish(mqttService.MQTT_ENVIAR_ESTADO, msg);
  });

  /* sockets messages handlers */
  socketService.addListener('state_change', function(newState) {
    console.log('message executed: ' + newState);
    const mesaId = 1; // find the mesa id here
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
        MesaHistorial.create({mesaId: mesa.id, from: fromState, to: newState, timeDiff: hours}),
        mesa.save()
      ]);
    }).then((mesaHistorial) => {
      mqttService.publish(mqttService.MQTT_ENVIAR_ESTADO, newState);
      console.log('mesa updated');
    });
  });

  /*
  socketService.addListener('state_change', function(newState) {
    console.log('message executed: ' + newState);
    const mesaId = 1; // find the mesa id here
    // save the new state in the db
    Mesa.findById(mesaId).then((mesa) => {
      mesa.state = newState;
      return mesa.save();
    })
    .then(() => {
      // notify the WEMOS the new state
      mqttService.publish(mqttService.MQTT_ENVIAR_ESTADO, newState);
    });
  });
  */
}