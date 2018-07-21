/* interface class */
export default class State {
  constructor() {
    this.mesa = null;
    this.name = ''; // the state display name
    this.action = ''; // the key action to change to this state
    this.color = '';  // the state color
  }

  /* state machine actions are handled by the state */
  atendido() {}
}