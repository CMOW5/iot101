import React, {Component} from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateTemp = this.updateTemp.bind(this);
  }

  /**
   * the component mounted successfully
   */
  componentDidMount() {
    socket.on('temperature', (temperature) => {
      console.log('message from socket io', temperature.value);
      this.updateTemp(temperature.value);
    });
  }

  updateTemp(temp) {
    this.setState({
      temp: temp
    });
  }

  handleClick() {
    socket.emit('chat message', 'message from socket');
    console.log('clicked');
  }
  render() {
    return (
      <div>
      <button onClick={this.handleClick}>hellow world</button>
      <h1>Counter </h1>
      <span>{this.state.temp}</span>
      </div>
    );
  }
}

// const App = () => <div>💅</div>;

export default App;