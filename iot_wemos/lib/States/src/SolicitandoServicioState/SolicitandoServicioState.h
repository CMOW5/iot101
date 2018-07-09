#ifndef SOLICITANDO_SERVICIO_STATE_H_
#define SOLICITANDO_SERVICIO_STATE_H_

#include "State.h"
#include "AppStateMachine.h"
#include "App.h"

class AppStateMachine;
class App;


class SolicitandoServicioState: public State {
private:
  // AppStateMachine *appStateMachine;
  App *app;
public:
  // SolicitandoServicioState(AppStateMachine *appStateMachine);
  SolicitandoServicioState(App *app);
  void solicitarServicio(void);
};

#endif
