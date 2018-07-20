/* helepers */
import isString from 'lodash/isString';

/* states */
import DisponibleState from './state/states/disponible-state';
import SolicitandoServicioState from './state/states/solicitando-servicio-state';
import PedidoTomadoState from './state/states/pedido-tomado-state';
import AtendidoState from './state/states/atendido-state';
import AlarmaState from './state/states/alarma-state';


export default class Mesa {
  constructor(number, state) {
    this.number = number;
    this.state = {}; // init the current state
    this.setState(state);
    this.disponibleState = new DisponibleState(this);
    this.solicitandoServicioState = new SolicitandoServicioState(this);
    this.pedidoTomadoState = new PedidoTomadoState(this);
    this.atendidoState = new AtendidoState(this);
    this.alarmaState = new AlarmaState(this);
  }

  /* state machine actions */
  confirmado() {
    this.state.confirmado();
  }

  atendido() {
    this.state.atendido();
  }
  
  /* state getters */
  getStateName() {
    return this.state.name;
  }

  getStateColor() {
    return this.state.color;
  }

  getDisponibleState() {
    return this.disponibleState;
  }

  getPedidoTomadoState() {
    return this.pedidoTomadoState;
  }

  getSolicitandoServicioState() {
    return this.solicitandoServicioState;
  }

  getAtendidoState() {
    return this.atendidoState;
  }

  getAlarmaState() {
    return this.alarmaState;
  }

  /* state setters */

  setState(newState) {
    console.log('new state = ', newState);
    if (!isString(newState)) return setStateByInstance(newState);

    switch(newState) {
      case 'disponible':
        this.state = new DisponibleState(this);
        return;
      case 'solicitando_servicio':
        this.state = new SolicitandoServicioState(this);
        return;
      case 'pedido_tomado':
        this.state = new PedidoTomadoState(this);
        return;
      case 'atendido':
        this.state = new AtendidoState(this);
        return;
      case 'alarma':
        this.state = new AlarmaState(this);
        return;
      default:
        return;
    }
  }

  setStateByInstance(newState) {
    this.state = newState;
  }

}