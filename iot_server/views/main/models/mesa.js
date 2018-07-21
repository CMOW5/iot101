/* helepers */
import isString from 'lodash/isString';

/* states */
import DisponibleState from './state/states/disponible-state';
import SolicitandoServicioState from './state/states/solicitando-servicio-state';
import PedidoTomadoState from './state/states/pedido-tomado-state';
import AtendidoState from './state/states/atendido-state';
import AlarmaState from './state/states/alarma-state';


export default class Mesa {
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
  confirmado() {
    this.state.confirmado();
  }

  atendido() {
    this.state.atendido();
  }
  
  /* state properties getters */
  getStateName() {
    return this.state.name;
  }

  getStateColor() {
    return this.state.color;
  }

  /* state instance getters */
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
    if (!isString(newState)) return setStateByInstance(newState);

    switch(newState) {
      case 'disponible':
        this.state = this.disponibleState
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

  setStateByInstance(newState) {
    this.state = newState;
  }

}