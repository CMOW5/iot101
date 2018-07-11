/* states */
import State from '../state';

export default class DisponibleState extends State {
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'disponible';
    this.color = 'green';
  }
  
  confirmado() {

  }
  
  atendido() {
    
  }
  // other states
}