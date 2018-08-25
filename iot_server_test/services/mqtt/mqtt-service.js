let mqtt = require('mqtt');
const mqttConfig = require('../../config/mqtt.js');

let mqttService = {};

let client = mqtt.connect('mqtt://' + mqttConfig.MQTT_SERVER);

mqttService.client = client;

// TODO: jsdoc this
mqttService.publish = function(channel, message) {
  console.log('publishin to channel ' + channel + ' message = ' + message);
  client.publish(channel, message);
};

mqttService.subscribeToMesa = function(mesaId) {
  client.subscribe(getMesaStateTopic(mesaId));
  client.subscribe(getMesaDatosTopic(mesaId));
};

mqttService.changeMesaState = function(mesaId, newState) {
  const topic = getMesaChangeStateTopic(mesaId);
  client.publish(topic, newState);
};

mqttService.isStateChangeTopic = function(topic) {
  const re = /^restaurante\/mesa_\d+\/estado/;
  return re.test(topic);
};

mqttService.isLoadDataTopic = function(topic) {
  const re = /^restaurante\/mesa_\d+\/datos/;
  return re.test(topic);
};

mqttService.getMesaIdFromTopic = function(topic) {
  if (topic.includes('mesa_')) {
    let firstSlash = topic.indexOf('/');
    let lastSlash = topic.indexOf('/', firstSlash + 1);
    let mesaName = topic.substring(firstSlash + 1, lastSlash);
    let mesaId = parseInt(mesaName.substring(mesaName.indexOf('_') + 1));
    return mesaId;
  }
};


/* helpers */

/**
 * get the mesa state topic
 *
 * @param {*} mesaId
 * @return {string}
 */
function getMesaStateTopic(mesaId) {
  return `restaurante/mesa_${mesaId}/estado`;
}

/**
 * get the mesa change state topic
 *
 * @param {*} mesaId
 * @return {string}
 */
function getMesaChangeStateTopic(mesaId) {
  return `restaurante/mesa_${mesaId}/server/estado`;
}

// TODO: replace this topic with a simple http request
/**
 * get the mesa datos topic
 *
 * @param {*} mesaId
 * @return {string}
 */
function getMesaDatosTopic(mesaId) {
  return `restaurante/mesa_${mesaId}/datos`;
}

module.exports = mqttService;

