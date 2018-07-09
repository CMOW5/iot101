#ifndef DISPONIBLE_STATE_H_
#define DISPONIBLE_STATE_H_

#include "State.h"
#include "AppStateMachine.h"

class AppStateMachine;

class DisponibleState: public State {
private:
  AppStateMachine *appStateMachine;
public:
  DisponibleState(AppStateMachine *appStateMachine);
  void solicitarServicio(void);
};

#endif
