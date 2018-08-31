#include "Arduino.h"
#include "App.h"
#include "Pins.h"
#include "Wifi_Handler.h"
#include "MQTT_Handler.h"
#include "IOHandler.h"
#include "EEPROM_Handler.h"

WifiHandler wifiHandler;
MQTTHandler mqttHandler(wifiHandler);
IOHandler ioHandler;
Pins pins;

EEPROMHandler eepromHandler;
// configuration loader
String configurationData = "";         // a String to hold incoming data
bool configurationReceived = false;  // whether the string is complete
/*
App app(
  &pins,
  &mqttHandler,
  &wifiHandler,
  mqttHandler.getEvents(),
  ioHandler.getEvents()
);
*/

void initPins(void);
void serialEvent(void);

void setup() {
  // reserve 512 bytes for the configurationData: (max eeprom size)
  Serial.begin(9600);
  delay(1000);
  configurationData.reserve(512);
  // initPins();
  // app.initialize();
  Serial.println("start.........");

  String eepromvalue1 = eepromHandler.readWifiNetwork();
  String eepromvalue2 = eepromHandler.readWifiPassword();
  String eepromvalue3 = eepromHandler.readMqttServerIp();
  String eepromvalue4 = eepromHandler.readMqttPort();
  String eepromvalue5 = eepromHandler.readMqttUsername();
  String eepromvalue6 = eepromHandler.readMqttKey();
  String eepromvalue7 = eepromHandler.readMesaNumber();

  Serial.println("wifinetwork = " + eepromvalue1);
  Serial.println("wifipass = " + eepromvalue2);
  Serial.println("mqttip = " + eepromvalue3);
  Serial.println("mqttport = " + eepromvalue4);
  Serial.println("mqttuser = " + eepromvalue5);
  Serial.println("mqttkey = " + eepromvalue6);
  Serial.println("mesa = " + eepromvalue7);
  /*
  eepromHandler.writeWifiNetwork("2 wifi-network 2");
  eepromHandler.writeWifiPassword("2 wifi-password 2");
  eepromHandler.writeMqttServerIp("2 mqtt-ip 2");
  eepromHandler.writeMqttPort("2 mqtt-port 2");
  eepromHandler.writeMqttUsername("2 mqtt-username 2");
  eepromHandler.writeMqttKey("2 mqtt-key 2");
  eepromHandler.writeMesaNumber("2 mesa-number 2");
  eepromvalue1 = eepromHandler.readWifiNetwork();
  eepromvalue2 = eepromHandler.readWifiPassword();
  eepromvalue3 = eepromHandler.readMqttServerIp();
  eepromvalue4 = eepromHandler.readMqttPort();
  eepromvalue5 = eepromHandler.readMqttUsername();
  eepromvalue6 = eepromHandler.readMqttKey();
  eepromvalue7 = eepromHandler.readMesaNumber();
  Serial.println("wifinetwork = " + eepromvalue1);
  Serial.println("wifipass = " + eepromvalue2);
  Serial.println("mqttip = " + eepromvalue3);
  Serial.println("mqttport = " + eepromvalue4);
  Serial.println("mqttuser = " + eepromvalue5);
  Serial.println("mqttkey = " + eepromvalue6);
  Serial.println("mesa = " + eepromvalue7);
  */
}

void loop() {
  // app.tasks();
/*
  serialEvent();
  if (configurationReceived) {
    Serial.println(configurationData);
    // clear the configuration:
    configurationData = "";
    configurationReceived = false;
  }
  */
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
  return;
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the configurationData:
    configurationData += inChar;
    // if the incoming character is a newline, set a flag so the main loop can
    // do something about it:
    if (inChar == '\n') {
      configurationReceived = true;
    }
  }
}
