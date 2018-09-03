#include "SerialHandler.h"

bool SerialHandler::enable = true;

void SerialHandler::enableLogs() {
  SerialHandler::enable = true;
}

void SerialHandler::disableLogs() {
  SerialHandler::enable = false;
}

bool SerialHandler::canPrint() {
  return SerialHandler::enable;
}

void SerialHandler::println(const String &data) {
  if (!canPrint()) {
    return;
  }

  Serial.println(data);
}

void SerialHandler::println(const char data[]) {
  if (!canPrint()) {
    return;
  }

  Serial.println(data);
}

void SerialHandler::println(char data) {
  if (!canPrint()) {
    return;
  }

  Serial.println(data);
}

void SerialHandler::println(int data) {
  if (!canPrint()) {
    return;
  }

  Serial.println(data);
}

void SerialHandler::println(const Printable& data) {
  if (!canPrint()) {
    return;
  }

  Serial.println(data);
}
