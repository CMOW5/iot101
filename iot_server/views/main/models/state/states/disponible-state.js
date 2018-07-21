/* states */
import State from '../state';

export default class DisponibleState extends State {
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'disponible';
    this.action = 'disponible'; // the key action to change to this state
    this.color = 'red';
  }
}