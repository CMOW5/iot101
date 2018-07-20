#include "Pin.h"

bool Pin::toogleStatus = false;

Pin::Pin(byte value) {
  pinVal = value;
}

Pin::~Pin() {
  flipper.detach();
}

void toggle(byte pin) {
  int reading = digitalRead(pin);
  if (reading == 0) {
    digitalWrite(pin, HIGH);
  } else {
    digitalWrite(pin, LOW);
  }
}

// Initialize the aplication modules
void Pin::mode(uint8_t mode)
{
  pinMode(pinVal, mode);
}

void Pin::turnOn() {
  flipper.detach(); // if the led was intermitent, stop the flipper
  digitalWrite(pinVal, HIGH);
}

void Pin::turnOff() {
  flipper.detach(); // if the led was intermitent, stop the flipper
  digitalWrite(pinVal, LOW);
}

void Pin::intermitent() {
  flipper.attach(0.3, toggle, pinVal);
}

// Initialize the aplication modules
byte Pin::value()
{
  return pinVal;
}
