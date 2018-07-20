#include "Arduino.h"
#include "App.h"
#include "Pins.h"
#include "Wifi_Handler.h"
#include "MQTT_Handler.h"
#include "IOHandler.h"

WifiHandler wifiHandler;
MQTTHandler mqttHandler(wifiHandler);
IOHandler ioHandler;
Pins pins;

App app(
  &pins,
  &mqttHandler,
  &wifiHandler,
  mqttHandler.getEvents(),
  ioHandler.getEvents()
);

void initPins(void);

void setup() {
  initPins();
  app.initialize();
}

void loop() {
  app.tasks();
}

void initPins() {
  pins.D5.mode(INPUT_PULLUP);
  pins.D6.mode(INPUT_PULLUP);
  pins.D1.mode(OUTPUT); // red
  pins.D2.mode(OUTPUT); // green
  pins.D3.mode(OUTPUT); // blue
}
