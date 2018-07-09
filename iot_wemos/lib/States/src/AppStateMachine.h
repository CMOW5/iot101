#ifndef APP_STATE_MACHINE_H_
#define APP_STATE_MACHINE_H_

#include "State.h"
#include "./SolicitandoServicioState/SolicitandoServicioState.h"
#include "./DisponibleState/DisponibleState.h"

/**
 * This class should handle the aplication logic
 *
 */

class AppStateMachine {
public:
  AppStateMachine();
  State *disponibleState;
  State *solicitandoServicioState;
  State *state; // the current state

  //actions
  void solicitarServicio(void);
  void someAction(void);
  // insertQuarter()
  // ejectQuarter()
  void setState(State *newState);
  State* getDisponibleState(void);
  State* getSolicitandoServicioState(void);
};


#endif
