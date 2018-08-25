/* states */
import State from '../state';

/**
 * an disponible state
 */
export default class DisponibleState extends State {
  /**
   * create a new instance
   * @param {*} mesa
   */
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'disponible';
    this.action = 'disponible'; // the key action to change to this state
    this.color = 'red';
  }
}
