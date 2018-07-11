/* interface class */
export default class State {
  constructor() {
    this.name = '';
    this.color = '';
    // this.successors = [];
  }
  
  /* state machine actions are handled by the state */
  confirmado() {}
  atendido() {}
  // other states
}