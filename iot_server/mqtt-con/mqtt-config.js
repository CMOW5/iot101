'use strict';

const socketApi = require('../socket/socketApi');
const mqttHandler = require('./mqttHandler.js');
const mqttClient = mqttHandler.client;

module.exports = (app) => {

  /* mqtt init */
  mqttClient.on('connect', function () {
    mqttClient.subscribe(mqttHandler.MQTT_TOPIC_TEMPERATURE);
    mqttClient.subscribe(mqttHandler.MQTT_TOPIC_HUMIDITY);
    mqttClient.subscribe(mqttHandler.MQTT_TOPIC_SOLICITAR_SERVICIO);
  });  

  /* mqtt messages handlers */
  mqttClient.on('message', function (topic, message) {
    console.log(topic);
    console.log(message.toString());
    
    if (topic === mqttHandler.MQTT_TOPIC_SOLICITAR_SERVICIO) {
      // save the state in the db

      // notify the front end the mesa state
      socketApi.sendNotification('state_change', {value: message.toString()});
    }


    if (topic === mqttHandler.MQTT_TOPIC_TEMPERATURE) {
      socketApi.sendNotification('temperature', {value: message.toString()});
    }

    if (topic === mqttHandler.MQTT_TOPIC_HUMIDITY) {
      socketApi.sendNotification('humidity', {value: message.toString()});
      mqttHandler.publish();
    }
    //client.publish('presence', 'Hello mqtt')
  });

  /* sockets messages handlers */
  socketApi.addListener('chat message', function(msg) {
    console.log('message executed: ' + msg);
    mqttHandler.publish('/feeds/onoff', msg);
  });
  
  /*
   socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  */

}