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

WifiHandler wifiHandler;
MQTTHandler mqttHandler(wifiHandler);
IOHandler ioHandler;
Pins pins;

SystemConfig* systemConfig;
Ticker serialPoll;

// configuration loader
String configurationData = "";         // a String to hold incoming data
bool configurationReceived = false;  // whether the string is complete

App app(
  &pins,
  &mqttHandler,
  &wifiHandler,
  mqttHandler.getEvents(),
  ioHandler.getEvents()
);


void initPins(void);
void serialEvent(void);

void setup() {
  // reserve 512 bytes for the configurationData: (max eeprom size)
  Serial.begin(9600);
  SerialHandler::disableLogs();
  delay(1000);
  configurationData.reserve(512);

  systemConfig = SystemConfig::instance();
  SerialHandler::println("System config = ");
  SerialHandler::println(systemConfig->toString());

  // check the serial buffer every 1 ms
  serialPoll.attach_ms(20, serialEvent);

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
