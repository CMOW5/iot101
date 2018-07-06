#ifndef _APP_H_
#define _APP_H_

// #include "system_definitions.h"
// #include "system_interrupt.h"
#include <Arduino.h>
#include "../../System/src/system_config.h"
#include "../../WifiHandler/src/Wifi_Handler.h"

class App
{
  int attr1;
  int attr2;
  WifiHandler wifiHandler;

  public:
    void initialize(void);
    void tasks(void);
};

#endif
