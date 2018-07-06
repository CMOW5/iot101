#ifndef _EVENTS_H_
#define _EVENTS_H_

// #include "system_definitions.h"
// #include "system_interrupt.h"
#include <Ticker.h>
#include <Arduino.h>

class Events
{

  // events flags
  // set this variables as volatile to avoid the compiler optimization
  public:
    //attributes
    int attr1 = 1;
    static bool event_btn1;
    static bool event_btn2;

    // methods
    static void event1(void);
    static void event2(void);
    static void eventButton1(void);
    static void eventButton2(void);
};

#endif
