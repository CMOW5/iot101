import React, {Component} from 'react';

/* services */
const socketHandler = require('./services/socket/socket-handler');

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
  }

  /**
   * the component mounted successfully
   */
  componentDidMount() {
    socketHandler.socket.on('state_change', (newState) => {
      console.log('new state = ', newState.value);
      this.updateMesas(newState.value);
    });
    socketHandler.socket.on('temperature', (temperature) => {
      console.log('message from socket io', temperature.value);
    });
    socketHandler.socket.on('humidity', (humidity) => {
      console.log('message from socket io', humidity.value);
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
    // socket.emit('chat message', 'message from socket');
    socketHandler.sendNotification('chat message', action);
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
