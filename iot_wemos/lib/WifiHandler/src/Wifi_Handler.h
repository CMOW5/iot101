#ifndef _WIFI_HANDLER_H_
#define _WIFI_HANDLER_H_

#include <ESP8266WiFi.h>
#include "system_config.h"

#define SSID "TEC4825"
#define SSPASSWORD "91121608540"

class WifiHandler
{
  public:
    WiFiClient client;
    // methods
    WifiHandler();  // This is the constructor
    void connect(void);

  private:
    SystemConfig* systemConfig;
};

#endif
