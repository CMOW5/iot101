#ifndef _PIN_H_
#define _PIN_

#include <Arduino.h>

class Pin
{
  byte pinVal;

  public:
    // methods
    Pin(byte value);
    byte getValue();
    void mode(uint8_t mode);
};

#endif
