#ifndef _EVENTS_H_
#define _EVENTS_H_

// #include "system_definitions.h"
// #include "system_interrupt.h"

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
    Events();
    static void event1(void);
    static void event2(void);
};

#endif
