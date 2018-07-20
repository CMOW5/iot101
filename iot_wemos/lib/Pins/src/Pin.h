#ifndef _PIN_H_
#define _PIN_H_

#include <Arduino.h>
#include <Ticker.h>

class Pin
{
  byte pinVal;
  Ticker flipper;
  static bool toogleStatus;

  public:
    // methods
    Pin(byte value);
    ~Pin();
    byte value();
    void mode(uint8_t mode);
    void turnOn(void);
    void turnOff(void);
    void intermitent(void);
    // static void toggle(Pin*);
};

#endif
