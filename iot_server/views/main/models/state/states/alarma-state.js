/* states */
import State from '../state';

export default class AlarmaState extends State {
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'alarma';
    this.color = 'flashing-red';
  }
  
  confirmado() {

  }
  
  atendido() {
    
  }
  // other states
}