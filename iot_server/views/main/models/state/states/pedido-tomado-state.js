import State from '../state';
import Mesa from '../../mesa';

export default class PedidoTomadoState extends State {
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'pedido tomado';
    this.color = 'flashing-green';
  }
  
  confirmado() {

  }
  
  atendido() {
    
  }
  // other states
}