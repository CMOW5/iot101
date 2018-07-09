#ifndef _PIN_H_
#define _PIN_H_

#include <Arduino.h>

class Pin
{
  byte pinVal;

  public:
    // methods
    Pin(byte value);
    byte value();
    void mode(uint8_t mode);
};

#endif
