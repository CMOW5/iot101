#include "Pin.h"

Pin::Pin(byte value) {
  pinVal = value;
}

// Initialize the aplication modules
void Pin::mode(uint8_t mode)
{
  pinMode(pinVal, mode);
}

void Pin::turnOn() {
  digitalWrite(pinVal, HIGH);
}

void Pin::turnOff() {
  digitalWrite(pinVal, LOW);
}

// Initialize the aplication modules
byte Pin::value()
{
  return pinVal;
}
