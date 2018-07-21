/* states */
import State from '../state';

export default class AlarmaState extends State {
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'alarma'; 
    this.action = 'alarma'; // the key action to change to this state
    this.color = 'flashing-red';
  }
}