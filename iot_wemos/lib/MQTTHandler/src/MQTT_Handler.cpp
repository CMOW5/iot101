#include "MQTT_Handler.h"
#include "Client.h"

MQTTEvents MQTTHandler::mqttEvents;

MQTTHandler::MQTTHandler(WifiHandler wifihandler) {
  systemConfig = SystemConfig::instance();

  mqtt = new Adafruit_MQTT_Client(
    &(wifihandler.client),
    systemConfig->mqttServerIp().c_str(),
    // atoi(systemConfig->mqttPort().c_str()),
    1883,
    systemConfig->mqttUsername().c_str(),
    systemConfig->mqttUsername().c_str(),
    systemConfig->mqttKey().c_str());

  cargarDatosFeed = new Adafruit_MQTT_Publish(mqtt, MQTT_FEED_CARGAR_DATOS);
  estadoFeed = new Adafruit_MQTT_Publish(mqtt, MQTT_FEED_CAMBIAR_ESTADO);

  // Setup a feed called 'onoff' for subscribing to changes.
  estadoSub = new Adafruit_MQTT_Subscribe(mqtt, MQTT_SUB_ESTADO, MQTT_QOS_1);
}

void MQTTHandler::initialize(void) {
  // set the subscriptions callbacks
  estadoSub->setCallback(MQTTHandler::mqttEvent);

  // Setup MQTT subscription for time feed
  mqtt->subscribe(estadoSub);
}

void MQTTHandler::connect() {
  if (mqtt->connected())
   return;
 	Serial.print("Connecting to MQTT... ");
	while (mqtt->connect() != 0) {
		Serial.println("Error. Retrying MQTT connection in 5 seconds...");
	  mqtt->disconnect();
	  delay(5000);
	 }
	 Serial.print("MQTT connected ");

   // ping the server to keep the mqtt connection alive
   // NOT required if you are publishing once every KEEPALIVE seconds
   if(!mqtt->ping()) {
     mqtt->disconnect();
     Serial.print("MQTT disconnected ");
   }
}

void MQTTHandler::mqttEvent(char *data, uint16_t len) {
  mqttEvents.channel = (char *) "/feeds/onoff";
  mqttEvents.setData(data);
  mqttEvents.setLen(len);
  mqttEvents.notify();
}

void MQTTHandler::processSubscriptions()
{
  // this is our 'wait for incoming subscription packets and callback em' busy subloop
  // this will block all other code execution
  mqtt->processPackets(1000);
}

MQTTEvents* MQTTHandler::getEvents() {
  return &mqttEvents;
}

void MQTTHandler::cargarDatos() {
  cargarDatosFeed->publish("datos");
}

void MQTTHandler::solicitarServicio() {
  estadoFeed->publish("solicitando_servicio");
}

void MQTTHandler::prenderAlarma() {
  estadoFeed->publish("alarma");
}
