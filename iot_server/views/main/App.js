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
    this.selectedAction = this.selectedAction.bind(this);
    this.loadMesas = this.loadMesas.bind(this);
  }

  /**
   * the component mounted successfully
   */
  componentDidMount() {
    socketHandler.socket.on('state_change', (newState) => {
      console.log('new state = ', newState.value);
      this.updateMesas(newState.value);
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

  updateMesas(newState) {
    const newMesas = this.state.mesas.map((mesa) => {
      if (mesa.id === 1) {
        mesa.state = newState;
      }
      return mesa;
    });
    this.setState({
      mesas: newMesas
    });
  }

  selectedAction(mesa, action) {
    console.log('selected action = ', action);
    socketHandler.sendNotification('state_change', action);
    this.updateMesas(action);
  }

  render() {
    return (
      <div className="container">
        {
          this.state.isFetching ? 
            <Loading show={true} title="" />
            : 
            <MainTable onSelectedAction={this.selectedAction} mesas={this.state.mesas} />
        }
      </div>
    );
  }
}

export default App;
