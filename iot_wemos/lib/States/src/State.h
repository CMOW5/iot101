#ifndef STATE_H_
#define STATE_H_

// Base class
class State {
   public:
      // pure virtual function providing interface framework.
      // virtual void datosCargados() = 0;
      virtual void solicitarServicio() = 0;
      virtual void pedidoTomado() = 0;
      virtual void atendido() = 0;
      virtual void prenderAlarma() = 0;
};

#endif
