#include "system_config.h"

SystemConfig* SystemConfig::pInstance = 0;

SystemConfig* SystemConfig::instance() {
  if (pInstance == 0) {
    pInstance = new SystemConfig;
  }
  return pInstance;
}

bool SystemConfig::writeConfigurationData(String jsonConfigurationData) {
  // check the json configuration data
  StaticJsonBuffer<512> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(jsonConfigurationData.c_str());
  
  // Test if parsing succeeds.
  if (!root.success()) {
    Serial.println("parseObject() failed");
    return false;
  }

  const char* wifiNetwork = root["wifiNetwork"];
  const char* wifiPassword = root["wifiPassword"];
  const char* mqttServer = root["mqttServer"];
  const char* mqttPort = root["mqttPort"];
  const char* mqttUser = root["mqttUser"];
  const char* mqttKey = root["mqttKey"];
  const char* mesa = root["mesa"];

  this->writeWifiNetwork(wifiNetwork);
  this->writeWifiPassword(wifiPassword);
  this->writeMqttServerIp(mqttServer);
  this->writeMqttPort(mqttPort);
  this->writeMqttUsername(mqttUser);
  this->writeMqttKey(mqttKey);
  this->writeMesaNumber(mesa);
  return true;
}

bool SystemConfig::writeWifiNetwork(String wifiNetwork) {
  return eepromHandler.writeWifiNetwork(wifiNetwork);
}

bool SystemConfig::writeWifiPassword(String wifiPassword) {
  return eepromHandler.writeWifiPassword(wifiPassword);
}

bool SystemConfig::writeMqttServerIp(String mqttIp) {
  return eepromHandler.writeMqttServerIp(mqttIp);
}

bool SystemConfig::writeMqttPort(String mqttPort) {
  return eepromHandler.writeMqttPort(mqttPort);
}

bool SystemConfig::writeMqttUsername(String mqttUsername) {
  return eepromHandler.writeMqttUsername(mqttUsername);
}

bool SystemConfig::writeMqttKey(String mqttKey) {
  return eepromHandler.writeMqttKey(mqttKey);
}

bool SystemConfig::writeMesaNumber(String mesaNumber) {
  return eepromHandler.writeMesaNumber(mesaNumber);
}

String SystemConfig::wifiNetwork() {
  return eepromHandler.readWifiNetwork();
}

String SystemConfig::wifiPassword() {
  return eepromHandler.readWifiPassword();
}

String SystemConfig::mqttServerIp() {
  return eepromHandler.readMqttServerIp();
}

String SystemConfig::mqttPort() {
  return eepromHandler.readMqttPort();
}

String SystemConfig::mqttUsername() {
  return eepromHandler.readMqttUsername();
}

String SystemConfig::mqttKey() {
  return eepromHandler.readMqttKey();
}

String SystemConfig::mesaNumber() {
  return eepromHandler.readMesaNumber();
}

String SystemConfig::toString(void) {
  String output = "";
  output += "wifi network = " + String(this->wifiNetwork()) + "\n";
  output += "wifi pass = " + this->wifiPassword() + "\n";
  output += "mqtt server ip pass = " + this->mqttServerIp() + "\n";
  output += "mqtt port = " + this->mqttPort() + "\n";
  output += "mqtt username = " + this->mqttUsername() + "\n";
  output += "mqtt key = " + this->mqttKey() + "\n";
  output += "mesa number = " + this->mesaNumber() + "\n";
  return output;
}
