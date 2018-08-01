import React, {Component} from 'react';

/* services */
const socketHandler = require('./services/socket/socket-handler');
import mesasRequest from './services/api/mesas/mesas-request';

/* components */
import MainTable from './components/main_table/MainTable';
import Loading from './components/utils/loading/Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mesas: [
        {id: 1, state: 'disponible'}, 
        // {number: 2, state: 'solicitando_servicio'}
      ],
      isFetching: true,
    }
    this.updateMesas = this.updateMesas.bind(this);
    this.changeStateSelected = this.changeStateSelected.bind(this);
    this.loadMesas = this.loadMesas.bind(this);
  }

  /**
   * the component mounted successfully
   */
  componentDidMount() {
    socketHandler.socket.on('state_change', (mesaData) => {
      const {mesaId, newState} = mesaData;
      console.log('mesa id = ', mesaId); 
      console.log('new state = ', newState);
      this.updateMesas(mesaId, newState);
    });
    this.loadMesas();
  }

  async loadMesas() {
    const mesa = await mesasRequest.fetchMesas();
    this.setState({
      mesas: [
        {id: mesa.id, state: mesa.state},
      ],
      isFetching: false
    });
  }

  updateMesas(mesaId, newState) {
    const newMesas = this.state.mesas.map((mesa) => {
      if (mesa.id === mesaId) {
        mesa.state = newState;
      }
      return mesa;
    });
    this.setState({
      mesas: newMesas
    });
  }

  changeStateSelected(mesa, action) {
    console.log('selected mesa = ', mesa.id);
    console.log('selected action = ', action);
    const mesaData = {
      mesaId: mesa.id,
      newState: action,
    }

    socketHandler.sendNotification('state_change', mesaData);
    this.updateMesas(mesa.id, action);
  }

  render() {
    return (
      <div className="container">
        {
          this.state.isFetching ? 
            <Loading show={true} title="" />
            : 
            <MainTable onChangeStateSelected={this.changeStateSelected} mesas={this.state.mesas} />
        }
      </div>
    );
  }
}

export default App;
