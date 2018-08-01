/* helepers */
import isString from 'lodash/isString';

/* states */
import DisponibleState from './state/states/disponible-state';
import SolicitandoServicioState
  from './state/states/solicitando-servicio-state';
import PedidoTomadoState from './state/states/pedido-tomado-state';
import AtendidoState from './state/states/atendido-state';
import AlarmaState from './state/states/alarma-state';

/**
 * the mesa modal
 */
export default class Mesa {
  /**
   * create a new instance
   *
   * @param {number} id
   * @param {string|State} state
   */
  constructor(id, state) {
    this.id = id;
    this.state = {};
    this.disponibleState = new DisponibleState(this);
    this.solicitandoServicioState = new SolicitandoServicioState(this);
    this.pedidoTomadoState = new PedidoTomadoState(this);
    this.atendidoState = new AtendidoState(this);
    this.alarmaState = new AlarmaState(this);
    this.setState(state); // init the current state
  }

  /* state machine actions */

  /**
   * get the current state name
   *
   * @return {string}
   */
  getStateName() {
    return this.state.name;
  }

  /**
   * get the current state color
   *
   * @return {string}
   */
  getStateColor() {
    return this.state.color;
  }

  /**
   * get the DisponibleState instance
   *
   * @return {State}
   */
  getDisponibleState() {
    return this.disponibleState;
  }

  /**
   * get the PedidoTomadoState instance
   *
   * @return {State}
   */
  getPedidoTomadoState() {
    return this.pedidoTomadoState;
  }

  /**
   * get the SolicitandoServicioState instance
   *
   * @return {State}
   */
  getSolicitandoServicioState() {
    return this.solicitandoServicioState;
  }

  /**
   * get the AtendidoState instance
   *
   * @return {State}
   */
  getAtendidoState() {
    return this.atendidoState;
  }

  /**
   * get the AlarmaState instance
   *
   * @return {State}
   */
  getAlarmaState() {
    return this.alarmaState;
  }

  /**
   * set the current state to the given state
   *
   * @param {string|State} newState
   * @return {undefined}
   */
  setState(newState) {
    if (!isString(newState)) return setStateByInstance(newState);

    switch (newState) {
    case 'disponible':
      this.state = this.disponibleState;
      return;
    case 'solicitando_servicio':
      this.state = this.solicitandoServicioState;
      return;
    case 'pedido_tomado':
      this.state = this.pedidoTomadoState;
      return;
    case 'atendido':
      this.state = this.atendidoState;
      return;
    case 'alarma':
      this.state = this.alarmaState;
      return;
    default:
      return;
    }
  }

  /**
   * set the current state to the given state
   *
   * @param {State} newState
   */
  setStateByInstance(newState) {
    this.state = newState;
  }
}
