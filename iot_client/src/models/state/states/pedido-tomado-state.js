import State from '../state';

/**
 * an pedido tomado state
 */
export default class PedidoTomadoState extends State {
  /**
   * create a new instance
   * @param {*} mesa
   */
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'pedido tomado';
    this.action = 'pedido_tomado'; // the key action to change to this state
    this.color = 'flashing-green';
  }
}
