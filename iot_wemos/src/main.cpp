#include "Arduino.h"
#include "App.h"
#include "Pins.h"
#include "Wifi_Handler.h"
#include "MQTT_Handler.h"
#include "IOHandler.h"
#include "EEPROM_Handler.h"
#include "system_config.h"
#include <Ticker.h>
#include "SerialHandler.h"

// this object handles the wifi connection
WifiHandler wifiHandler;

// this object handles the mqtt connection
MQTTHandler mqttHandler(wifiHandler);

// this object handles the io events
IOHandler ioHandler;

// the application pins
Pins pins;

// system config is a singleton that holds
// the system and connection configuration
// e.g wifi network, wifi password, the mesa number, etc
SystemConfig* systemConfig;

// this poll checks if there is any serial data
// the configuration data is received via serial
Ticker serialPoll;

// configuration loader
String configurationData = ""; // a String to hold incoming data
bool configurationReceived = false;  // whether the string is complete

// the main state machine
App app(
  &pins,
  &mqttHandler,
  &wifiHandler,
  mqttHandler.getEvents(),
  ioHandler.getEvents()
);

/**
  initialize the pins
*/
void initPins(void);

/**
  this method is called every 20 ms to check
  if there is any serial data
*/
void serialEvent(void);

void setup() {
  Serial.begin(9600);

  // we disable the logs so they do not interfere
  // with the server communication when the configuration
  // is being loaded
  SerialHandler::disableLogs();

  delay(1000);

  // reserve 512 bytes for the configurationData: (max eeprom size)
  configurationData.reserve(512);

  systemConfig = SystemConfig::instance();

  SerialHandler::println("System config = ");
  SerialHandler::println(systemConfig->toString());

  // check the serial buffer every 1 ms, to see if there is
  // any config data to be loaded
  serialPoll.attach_ms(20, serialEvent);

  initPins();
  app.initialize();
}

void loop() {
  app.tasks();
}

void initPins() {
  pins.D5.mode(INPUT_PULLUP); // solicitar servicio button
  pins.D6.mode(INPUT_PULLUP); // alarma button
  pins.D1.mode(OUTPUT); // red led
  pins.D2.mode(OUTPUT); // green led
  pins.D3.mode(OUTPUT); // blue led
}

/*
  SerialEvent occurs whenever a new data comes in the hardware serial RX. This
  routine is run between each time loop() runs, so using delay inside loop can
  delay response. Multiple bytes of data may be available.
*/
void serialEvent() {
  if (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();

    // add it to the configurationData:
    configurationData += inChar;

    // if the incoming character is a newline, set a flag so the main loop can
    // do something about it:
    if (inChar == '\0') {
      // configurationReceived = true;
      if (systemConfig->writeConfigurationData(configurationData)) {
        Serial.print(1);
      } else {
        Serial.print(0);
      }
      configurationData = "";
    }
  }
}
