import State from '../state';
import Mesa from '../../mesa';

export default class SolicitandoServicioState extends State {
  constructor(mesa) {
    super();
    this.mesa = mesa;
    this.name = 'solicitando servicio';
    this.color = 'yellow';
  }
  
  confirmado() {

  }
  
  atendido() {
    
  }
  // other states
}