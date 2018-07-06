#include "Pin.h"

Pin::Pin(byte value) {
  pinVal = value;
}

// Initialize the aplication modules
void Pin::mode(uint8_t mode)
{
  pinMode(pinVal, mode);
}

// Initialize the aplication modules
byte Pin::getValue()
{
  return pinVal;
}
