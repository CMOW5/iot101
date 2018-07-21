/* states */
import State from '../state';

export default class AtendidoState extends State {
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'atendido';
    this.action = 'atendido'; // the key action to change to this state
    this.color = 'green';
  }
}