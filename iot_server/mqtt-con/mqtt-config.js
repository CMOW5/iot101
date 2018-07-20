'use strict';

const socketApi = require('../socket/socketApi');
const mqttHandler = require('./mqttHandler.js');
const mqttClient = mqttHandler.client;

/* repositories */
var Mesa = require('../models/mesa');

module.exports = (app) => {

  /* mqtt init */
  mqttClient.on('connect', function () {
    mqttClient.subscribe(mqttHandler.MQTT_TOPIC_TEMPERATURE);
    mqttClient.subscribe(mqttHandler.MQTT_TOPIC_HUMIDITY);
    mqttClient.subscribe(mqttHandler.MQTT_TOPIC_SOLICITAR_SERVICIO);
    mqttClient.subscribe('restaurante/mesa_1/estado');
    mqttClient.subscribe('restaurante/mesa_1/datos');
  });  

  /* mqtt messages handlers */
  mqttClient.on('message', function (topic, message) {
    console.log(topic);
    console.log(message.toString());
    
    if (topic === 'restaurante/mesa_1/estado') {
      const mesaId = 1; // find the mesa id here
      const newState = message.toString();
      
      // save the new state in the db
      Mesa.findById(mesaId).then((mesa) => {
        mesa.estado = newState;
        return mesa.save();
      })
      .then(() => {
        // notify the front end that the mesa x has a new state y 
        socketApi.sendNotification('state_change', {value: newState});
        console.log('mesa updated');
      });
    }

    if (topic === 'restaurante/mesa_1/datos') {
      console.log('cargar datos desde el servidor');
      const mesaId = 1; // find the mesa id here
      Mesa.findById(mesaId).then((mesa) => {
        const newState = mesa.estado;
        console.log('estado a enviar = ', newState);
        mqttHandler.publish(mqttHandler.MQTT_FEEDS_ONOFF, newState);
      });
    }
  });

  /* sockets messages handlers */
  socketApi.addListener('chat message', function(msg) {
    console.log('message executed: ' + msg);
    mqttHandler.publish(mqttHandler.MQTT_FEEDS_ONOFF, msg);
  });

  /* sockets messages handlers */
  socketApi.addListener('state_change', function(newState) {
    console.log('message executed: ' + newState);
    const mesaId = 1; // find the mesa id here
    // save the new state in the db
    Mesa.findById(mesaId).then((mesa) => {
      mesa.estado = newState;
      return mesa.save();
    })
    .then(() => {
      // notify the WEMOS the new state
      mqttHandler.publish(mqttHandler.MQTT_FEEDS_ONOFF, newState);
    });
  });
}