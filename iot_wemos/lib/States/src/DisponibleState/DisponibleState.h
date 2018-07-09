#ifndef DISPONIBLE_STATE_H_
#define DISPONIBLE_STATE_H_

#include "State.h"
#include "AppStateMachine.h"
#include "App.h"

class AppStateMachine;
class App;

class DisponibleState: public State {
private:
  // AppStateMachine *appStateMachine;
  App *app;
public:
  DisponibleState(App *app);
  void solicitarServicio(void);
};

#endif
