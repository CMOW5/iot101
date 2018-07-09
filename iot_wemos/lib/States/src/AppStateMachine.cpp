#include "AppStateMachine.h"

AppStateMachine::AppStateMachine() {
    // disponibleState = new DisponibleState(this);
    // solicitandoServicioState = new SolicitandoServicioState(this);
    // state = disponibleState;
}

void AppStateMachine::solicitarServicio(void) {
  state->solicitarServicio();
}

void AppStateMachine::someAction(void) {
  // this.state->solicitarServicio();
}

void AppStateMachine::setState(State *newState) {
  state = newState;
}

State* AppStateMachine::getDisponibleState(void) {
  return disponibleState;
}

State* AppStateMachine::getSolicitandoServicioState(void) {
  return solicitandoServicioState;
}

// send qtt x action

// send wifi x action
