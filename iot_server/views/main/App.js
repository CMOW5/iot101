import React, {Component} from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

/* components */
import MainTable from './components/main_table/MainTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btn1: 0,
      btn2: 0,
      status: 0,
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
      document.getElementById('div1').style.background='red';
      setTimeout(
        () => {
          document.getElementById('div1').style.background='none';
      }, 300);
    });
    socket.on('humidity', (humidity) => {
      console.log('message from socket io', humidity.value);
      this.updateTemp(humidity.value);
      document.getElementById('div2').style.background='red';
      setTimeout(
        () => {
          document.getElementById('div2').style.background='none';
      }, 300);
    });
  }

  updateTemp(temp) {
    this.setState({
      bt1: 1
    });
  }

  handleClick() {
    socket.emit('chat message', 'message from socket');
    console.log('clicked');
  }
  render() {
    return (
      <div>
        <MainTable />
      </div>
    );
  }
}

// const App = () => <div>💅</div>;

export default App;
