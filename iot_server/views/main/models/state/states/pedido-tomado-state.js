import State from '../state';
import Mesa from '../../mesa';

export default class PedidoTomadoState extends State {
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'pedido tomado';
    this.action = 'pedido_tomado'; // the key action to change to this state
    this.color = 'flashing-green';
  }
}