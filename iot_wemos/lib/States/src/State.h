#ifndef STATE_H_
#define STATE_H_

// Base class
class State {
   public:
      // pure virtual function providing interface framework.
      virtual void solicitarServicio() = 0;
      virtual void confirmado() = 0;
};

#endif
