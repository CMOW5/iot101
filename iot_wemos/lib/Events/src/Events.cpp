#include "Events.h"

/* attrib initialization */
bool Events::solicitarServicio = false;
bool Events::event_btn2 = false;

bool isEventButton1Scheduled = false;
bool isEventButton2Scheduled = false;

Ticker ticker1;
Ticker ticker2;
void button1EventScheduled(void);
void button2EventScheduled(void);

// the program main state machine
void Events::eventButton1()
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
    Events::solicitarServicio = true;
  }
}

// the program main state machine
void Events::eventButton2()
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
    Events::event_btn2 = true;
  }
}
