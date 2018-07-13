#include "Arduino.h"
#include "App.h"
#include "Pins.h"
#include "Wifi_Handler.h"
#include "MQTT_Handler.h"
#include "IOHandler.h"

WifiHandler wifiHandler;
MQTTHandler mqttHandler(wifiHandler);
IOHandler ioHandler;
Pins *pins = new Pins();

App* app = new App(
  pins,
  &mqttHandler,
  &wifiHandler,
  mqttHandler.getEvents(),
  ioHandler.getEvents()
);

void initPins(void);

void setup() {
  initPins();
  app->initialize();
  wifiHandler.connect();
  mqttHandler.initialize();
  mqttHandler.connect();
}

void loop() {
  // the app state machine
  // app.tasks()
  mqttHandler.connect(); // keep the mqtt connection alive
  mqttHandler.processSubscriptions(); // keep watching for mqqt subcriptions events
}

void initPins() {
  pins->D5.mode(INPUT_PULLUP);
  pins->D6.mode(INPUT_PULLUP);
  pins->D1.mode(OUTPUT);
  pins->D2.mode(OUTPUT);
  pins->D3.mode(OUTPUT);
}
