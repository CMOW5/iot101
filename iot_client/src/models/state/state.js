/* interface class */
/**
 * this interface defines an state properties and actions
 */
export default class State {
  /**
   * create a new state instance
   * mesa = a Mesa model instance
   * name =  a token that represents the state display name
   * action = a token that represents the action to change to this state
   * color = a token that represents the state color
   */
  constructor() {
    this.mesa = null;
    this.name = ''; // the state display name
    this.action = ''; // the key action to change to this state
    this.color = ''; // the state color
  }

  /* state machine actions are handled by the state */
  // atendido() {}
}
