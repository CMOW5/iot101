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

  static void eventButton1(void);
	static void eventButton2(void);
  static void ioEventTrigered(void);
};

IOEvents IOHandler::ioEvents;

Ticker ticker1;
Ticker ticker2;
void button1EventScheduled(void);
void button2EventScheduled(void);

bool isEventButton1Scheduled = false;
bool isEventButton2Scheduled = false;

IOHandler::IOHandler() {
	// Events
	attachInterrupt(digitalPinToInterrupt(14), IOHandler::eventButton1, FALLING);
	attachInterrupt(digitalPinToInterrupt(12), IOHandler::eventButton2, FALLING);
}

void IOHandler::ioEvent() {
  // ioEvents.setData(data);
  // mqttEvents.setLen(len);
  ioEvents.notify();
}

IOEvents* IOHandler::getEvents() {
  return &ioEvents;
}

// the program main state machine
void IOHandler::eventButton1()
{
  if (isEventButton1Scheduled) return;

  // schedule the event to be debounced
  isEventButton1Scheduled = true;
  ticker1.attach(0.1, button1EventScheduled);
}

void button1EventScheduled() {
  ticker1.detach();
  isEventButton1Scheduled = false;
  int reading = digitalRead(14);
  if (reading == 0) { // the button is still pressed
    IOHandler::ioEventTrigered();
    // ioEvents.Notify();
    // Notify();
  }
}

// the program main state machine
void IOHandler::eventButton2()
{
  if (isEventButton2Scheduled) return;

  // schedule the event to be debounced
  isEventButton2Scheduled = true;
  ticker2.attach(0.1, button2EventScheduled);
}

void button2EventScheduled() {
  ticker2.detach();
  isEventButton2Scheduled = false;
  int reading = digitalRead(12);
  if (reading == 0) { // the button is still pressed
    // Notify();
    IOHandler::ioEventTrigered();
  }
}

void IOHandler::ioEventTrigered() {
  // ioEvents.setData(data);
  // mqttEvents.setLen(len);
  ioEvents.notify();
}


#endif /* CLOCKTIMER_H_ */
