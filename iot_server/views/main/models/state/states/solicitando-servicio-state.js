import State from '../state';
import Mesa from '../../mesa';

export default class SolicitandoServicioState extends State {
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'solicitando servicio';
    this.action = 'solicitando_servicio'; // the key action to change to this state
    this.color = 'blue';
  }
}