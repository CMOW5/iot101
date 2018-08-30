#include "EEPROM_Handler.h"

unsigned int EEPROMHandler::EEPROM_SIZE = 512;
unsigned int EEPROMHandler::BLOCK_LENGTH = 73;
unsigned int EEPROMHandler::MAX_DATA_LENGTH = 72;
int EEPROMHandler::WIFI_NETWORK_START = 0;
int EEPROMHandler::WIFI_PASSWORD_START = 73;
int EEPROMHandler::MQTT_IP_START = 146;
int EEPROMHandler::MQTT_PORT_START = 219;
int EEPROMHandler::MQTT_USERNAME_START = 292;
int EEPROMHandler::MQTT_KEY_START = 365;
int EEPROMHandler::MESA_NUMBER_START = 438;

EEPROMHandler::EEPROMHandler() {
  // load the pointers
}

bool EEPROMHandler::writeWifiNetwork(String wifiNetwork) {
  return writeToEEPROM(EEPROMHandler::WIFI_NETWORK_START, wifiNetwork);
}

bool EEPROMHandler::writeWifiPassword(String wifiPassword) {
  return writeToEEPROM(EEPROMHandler::WIFI_PASSWORD_START, wifiPassword);
}

bool EEPROMHandler::writeMqttServerIp(String mqttIp) {
  return writeToEEPROM(EEPROMHandler::MQTT_IP_START, mqttIp);
}

bool EEPROMHandler::writeMqttPort(String mqttPort) {
  return writeToEEPROM(EEPROMHandler::MQTT_PORT_START, mqttPort);
}

bool EEPROMHandler::writeMqttUsername(String mqttUsername) {
  return writeToEEPROM(EEPROMHandler::MQTT_USERNAME_START, mqttUsername);
}

bool EEPROMHandler::writeMqttKey(String mqttKey) {
  return writeToEEPROM(EEPROMHandler::MQTT_KEY_START, mqttKey);
}

bool EEPROMHandler::writeMesaNumber(String mesaNumber) {
  return writeToEEPROM(EEPROMHandler::MESA_NUMBER_START, mesaNumber);
}

String EEPROMHandler::readWifiNetwork() {
  return readFromEEPROM(EEPROMHandler::WIFI_NETWORK_START);
}

String EEPROMHandler::readWifiPassword() {
  return readFromEEPROM(EEPROMHandler::WIFI_PASSWORD_START);
}

String EEPROMHandler::readMqttServerIp() {
  return readFromEEPROM(EEPROMHandler::MQTT_IP_START);
}

String EEPROMHandler::readMqttPort() {
  return readFromEEPROM(EEPROMHandler::MQTT_PORT_START);
}

String EEPROMHandler::readMqttUsername() {
  return readFromEEPROM(EEPROMHandler::MQTT_USERNAME_START);
}

String EEPROMHandler::readMqttKey() {
  return readFromEEPROM(EEPROMHandler::MQTT_KEY_START);
}

String EEPROMHandler::readMesaNumber() {
  return readFromEEPROM(EEPROMHandler::MESA_NUMBER_START);
}

bool EEPROMHandler::writeToEEPROM(int start, String data) {
  if (data.length() > EEPROMHandler::MAX_DATA_LENGTH) {
    return false;
  }

  EEPROM.begin(EEPROMHandler::EEPROM_SIZE);

  // holds the last eeprom direction of the data stored
  int lastDataPosition = data.length();

  for (unsigned int i = start + 1,
        j = 0; j < data.length(); i++, j++)
  {
    EEPROM.write(i, data[j]);
    // lastDataPosition = i;
  }

  EEPROM.write(start, lastDataPosition); // update the data size pointer

  EEPROM.commit();
  EEPROM.end();

  /*
  Serial.println("pointer location = ");
  Serial.println(start);
  Serial.println("pointer value = ");
  Serial.println(lastDataPosition);
  Serial.println("data = ");
  Serial.println(data);
  */


  return true;
}

String EEPROMHandler::readFromEEPROM(int startPointer) {
  EEPROM.begin(512);

  int dataLength = (int) EEPROM.read(startPointer);
  String eepromData = "";

  int startAddress = startPointer + 1;
  int endAddress =  startAddress + dataLength;

  for (int i = startAddress; i < endAddress; i++) {
    eepromData +=  (char) EEPROM.read(i);
  }

  return eepromData;
}
