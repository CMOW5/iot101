

#include "App.h"
#include "Wifi_Handler.h"
#include "MQTT_Handler.h"
#include "IOHandler.h"

WifiHandler wifiHandler;
MQTTHandler mqttHandler(wifiHandler);
IOHandler ioHandler;

App* app = new App(
  &mqttHandler,
  &wifiHandler,
  mqttHandler.getEvents(),
  ioHandler.getEvents()
);

void setup() {
  app->initialize();
  wifiHandler.connectWifi();
  mqttHandler.initialize();
  mqttHandler.connectMQTT();
}

void loop() {
  // the app state machine
  // app.tasks()
  mqttHandler.connectMQTT(); // keep the mqtt connection alive
  mqttHandler.processSubscriptions(); // keep watching for mqqt subcriptions events
}
