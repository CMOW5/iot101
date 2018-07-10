'use strict';

const socketApi = require('../socket/socketApi');
const mqttHandler = require('./mqttHandler.js');
const mqttClient = mqttHandler.client;

module.exports = (app) => {

  /* mqtt init */
  mqttClient.on('connect', function () {
    mqttClient.subscribe(mqttHandler.MQTT_TOPIC_TEMPERATURE);
    mqttClient.subscribe(mqttHandler.MQTT_TOPIC_HUMIDITY);
  });  

  /* mqtt messages handlers */
  mqttClient.on('message', function (topic, message) {
    console.log(topic);
    console.log(message.toString());
  
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
    mqttHandler.publish();
  });
  
  /*
   socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  */

}