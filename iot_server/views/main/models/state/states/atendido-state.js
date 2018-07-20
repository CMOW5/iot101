/* states */
import State from '../state';

export default class AtendidoState extends State {
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'atendido';
    this.color = 'green';
  }
  
  confirmado() {

  }
  
  atendido() {
    
  }
  // other states
}