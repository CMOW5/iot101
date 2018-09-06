#include "MQTT_Handler.h"
#include "Client.h"
#include "SerialHandler.h"

MQTTEvents MQTTHandler::mqttEvents;

MQTTHandler::MQTTHandler(WifiHandler wifihandler) {
  systemConfig = SystemConfig::instance();

  char* mqttServer = "192.168.0.13"; //Utils::strTocc(systemConfig->mqttServerIp());
  int mqttPort = 1883; // atoi(systemConfig->mqttPort().c_str());
  char* mqttUsername = "";// Utils::strTocc(systemConfig->mqttUsername());
  char* mqttKey = ""; // Utils::strTocc(systemConfig->mqttKey());

  mqtt = new Adafruit_MQTT_Client(
    &(wifihandler.client),
    mqttServer,
    mqttPort,
    mqttUsername,
    mqttUsername,
    mqttKey);

    /*
    "restaurante/mesa_5/datos"
    "restaurante/mesa_5/estado"
    "restaurante/mesa_5/server/estado"
    */


  // feeds topics
  cargarDatosFeed
    = new Adafruit_MQTT_Publish(mqtt, Utils::strTocc(feedCargarDatosTopic())
    );

  estadoFeed
    = new Adafruit_MQTT_Publish(mqtt, Utils::strTocc(feedStateChangeTopic())
      );

  // subscriptions topics
  estadoSub
    = new Adafruit_MQTT_Subscribe(
        mqtt, Utils::strTocc(subStateChangeTopic()), MQTT_QOS_1
      );
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

  SerialHandler::println("Connecting to MQTT... ");
	while (mqtt->connect() != 0) {
		SerialHandler::println("Error. Retrying MQTT connection in 5 seconds...");
	  mqtt->disconnect();
	  delay(5000);
	 }

	 SerialHandler::println("MQTT connected ");

   // ping the server to keep the mqtt connection alive
   // NOT required if you are publishing once every KEEPALIVE seconds
   if(!mqtt->ping()) {
     mqtt->disconnect();
     SerialHandler::println("MQTT disconnected ");
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

// mqtt topics channels
String MQTTHandler::baseTopic() {
  return MQTT_BASE_TOPIC + systemConfig->mesaNumber() + "/";
}

// mqtt topics channels
// eg => restaurante/mesa_x/datos
String MQTTHandler::feedCargarDatosTopic() {
  return baseTopic() + "datos";
}

// eg => restaurante/mesa_x/estado
String MQTTHandler::feedStateChangeTopic() {
  return baseTopic() + "estado";
}

// eg => restaurante/mesa_x/server/estado
String MQTTHandler::subStateChangeTopic() {
  return baseTopic() + "server/estado";
}
