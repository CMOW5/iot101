/* states */
import State from '../state';

/**
 * an atendido state
 */
export default class AtendidoState extends State {
  /**
   * create a new instance
   * @param {*} mesa
   */
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'atendido';
    this.action = 'atendido'; // the key action to change to this state
    this.color = 'green';
  }
}
