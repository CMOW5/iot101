/*
 * Clock.h
 *
 *  Created on: Jul 11, 2018
 *      Author: cristian
 */

#ifndef IO_HANDLER_H_
#define IO_HANDLER_H_

#include "IOEvents.h"
#include <Arduino.h>
#include <Ticker.h>

class IOEvents;

class IOHandler {
public:
	IOHandler();

	static IOEvents ioEvents;
  static IOEvents* getEvents();
  static void ioEvent();

  static void interruptEventD5(void);
	static void interruptEventD6(void);
  static void triggerIOEvent(int);
};

IOEvents IOHandler::ioEvents;

Ticker ticker1;
Ticker ticker2;
void isPinD5Debounced(void);
void isPinD6Debounced(void);

bool isEventButton1Scheduled = false;
bool isEventButton2Scheduled = false;

IOHandler::IOHandler() {
	// Events
	attachInterrupt(digitalPinToInterrupt(14), IOHandler::interruptEventD5, FALLING);
	attachInterrupt(digitalPinToInterrupt(12), IOHandler::interruptEventD6, FALLING);
}

void IOHandler::ioEvent() {
  // ioEvents.setData(data);
  ioEvents.notify();
}

IOEvents* IOHandler::getEvents() {
  return &ioEvents;
}

// the program main state machine
void IOHandler::interruptEventD5()
{
  if (isEventButton1Scheduled) return;

  // schedule the event to be debounced
  isEventButton1Scheduled = true;
  ticker1.attach(0.1, isPinD5Debounced);
}

void isPinD5Debounced() {
  ticker1.detach();
  isEventButton1Scheduled = false;
  int reading = digitalRead(14);
  if (reading == 0) { // the button is still pressed
    IOHandler::triggerIOEvent(14);
  }
}

// the program main state machine
void IOHandler::interruptEventD6()
{
  if (isEventButton2Scheduled) return;

  // schedule the event to be debounced
  isEventButton2Scheduled = true;
  ticker2.attach(0.1, isPinD6Debounced);
}

void isPinD6Debounced() {
  ticker2.detach();
  isEventButton2Scheduled = false;
  int reading = digitalRead(12);
  if (reading == 0) { // the button is still pressed
    IOHandler::triggerIOEvent(12);
  }
}

void IOHandler::triggerIOEvent(int pin) {
  ioEvents.setPin(pin);
  // mqttEvents.setLen(len);
  ioEvents.notify();
}


#endif /* CLOCKTIMER_H_ */
