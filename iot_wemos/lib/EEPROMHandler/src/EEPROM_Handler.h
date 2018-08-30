#ifndef _EEPROM_HANDLER_H_
#define _EEPROM_HANDLER_H_

#include "Arduino.h"
#include <EEPROM.h>

class EEPROMHandler
{

  public:
    EEPROMHandler();

    static unsigned int EEPROM_SIZE;
    static unsigned int BLOCK_LENGTH; // the length assigned to each data block
    static unsigned int MAX_DATA_LENGTH; // the maximum size of each field (wifipass, wifinetwork, etc)
    static int WIFI_NETWORK_START;
    static int WIFI_PASSWORD_START;
    static int MQTT_IP_START;
    static int MQTT_PORT_START;
    static int MQTT_USERNAME_START;
    static int MQTT_KEY_START;
    static int MESA_NUMBER_START;

    // methods
    bool writeToEEPROM(int start, String data);
    bool writeWifiNetwork(String wifiNetwork);
    bool writeWifiPassword(String wifiPassword);
    bool writeMqttServerIp(String mqttIp);
    bool writeMqttPort(String mqttPort);
    bool writeMqttUsername(String mqttUsername);
    bool writeMqttKey(String mqttKey);
    bool writeMesaNumber(String mesaNumber);

    String readFromEEPROM(int startPointer);
    String readWifiNetwork(void);
    String readWifiPassword(void);
    String readMqttServerIp(void);
    String readMqttPort(void);
    String readMqttUsername(void);
    String readMqttKey(void);
    String readMesaNumber(void);

  private:
    // SystemConfig* systemConfig;
};

#endif
