/*
 * File:   system_config.h
 * Author: CRISTIAN
 *
 * Created on July 5, 2018
 *
 * define the microcontroller configuration in this file
 */
#ifndef _SYSTEM_CONFIG_H_
#define _SYSTEM_CONFIG_H_

#include "../../EEPROMHandler/src/EEPROM_Handler.h"
#include "ArduinoJson.h"

class SystemConfig {
  public:
    static SystemConfig* instance();

    bool writeConfigurationData(String configurationData);
    bool writeWifiNetwork(String wifiNetwork);
    bool writeWifiPassword(String wifiPassword);
    bool writeMqttServerIp(String mqttIp);
    bool writeMqttPort(String mqttPort);
    bool writeMqttUsername(String mqttUsername);
    bool writeMqttKey(String mqttKey);
    bool writeMesaNumber(String mesaNumber);

    String wifiNetwork(void);
    String wifiPassword(void);
    String mqttServerIp(void);
    String mqttPort(void);
    String mqttUsername(void);
    String mqttKey(void);
    String mesaNumber(void);
    String toString(void);
    
  private:
    EEPROMHandler eepromHandler;
    static SystemConfig* pInstance;
};

#endif
