#include "Events.h"
// #include "app_events.h"

Events::Events() {

}

bool Events::event_btn1 = false;
bool Events::event_btn2 = false;

// the program main state machine
void Events::event1()
{
  event_btn1 = true;
}

// the program main state machine
void Events::event2()
{
  event_btn2 = true;
}
