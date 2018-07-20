import React, {Component} from 'react';

/* services */
const socketHandler = require('./services/socket/socket-handler');
const axios = require('axios');

// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3000');

/* components */
import MainTable from './components/main_table/MainTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mesas: [
        {number: 1, state: 'disponible'}, 
        // {number: 2, state: 'solicitando_servicio'}
      ],
    }
    this.handleClick = this.handleClick.bind(this);
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

  loadMesas() {
    console.log('get mesas');
    // Make a request for a user with a given ID
    axios.get('http://localhost:3000/mesa')
    .then((response) => {
      const mesa = response.data;
      this.setState({
        mesas: [
          {number: mesa.id, state: mesa.estado},
        ],
      });
    })
    .catch(function (error) {
      console.log('error = ', error);
      console.log(error);
    });
  }

  updateMesas(newState) {
    const newMesas = this.state.mesas.map((mesa) => {
      if (mesa.number === 1) {
        mesa.state = newState;
      }
      return mesa;
    });
    this.setState({
      mesas: newMesas
    });
  }

  handleClick() {
    socketHandler.sendNotification('chat message', 'message from socket');
    // this.socket.emit('chat message', 'message from socket');
    console.log('clicked');
  }

  selectedAction(mesa, action) {
    socketHandler.sendNotification('state_change', action);
    this.updateMesas(action);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>send</button>
        <MainTable onSelectedAction={this.selectedAction} mesas={this.state.mesas} />
      </div>
    );
  }
}

// const App = () => <div>💅</div>;

export default App;
