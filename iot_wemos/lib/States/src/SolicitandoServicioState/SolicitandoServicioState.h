#ifndef SOLICITANDO_SERVICIO_STATE_H_
#define SOLICITANDO_SERVICIO_STATE_H_

#include "State.h"
#include "AppStateMachine.h"

class AppStateMachine;

class SolicitandoServicioState: public State {
private:
  AppStateMachine *appStateMachine;
public:
  SolicitandoServicioState(AppStateMachine *appStateMachine);
  void solicitarServicio(void);
};

#endif
