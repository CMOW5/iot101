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

class SystemConfig {
  public:
    static SystemConfig* instance();

    // config variables
    // wifi
    const char* WIFI_SSID = "TEC4825"; // network
    const char* WIFI_PASS = "91121608540";

    //mqtt
    const char* MQTT_SERVER = "192.168.0.13";
    int MQTT_SERVERPORT = 1883;
    const char* MQTT_USERNAME = "";
    const char* MQTT_KEY = "";

  private:
    static SystemConfig* pInstance;
};

#endif
