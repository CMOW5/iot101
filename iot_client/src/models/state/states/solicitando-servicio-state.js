import State from '../state';

/**
 * an solicitando servicio state
 */
export default class SolicitandoServicioState extends State {
  /**
   * create a new instance
   * @param {*} mesa
   */
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'solicitando servicio';
    this.action = 'solicitando_servicio';
    this.color = 'blue';
  }
}
