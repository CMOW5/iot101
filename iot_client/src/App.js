import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// router
import { Switch, Route } from 'react-router'

// services
import mesasRequest from './services/api/mesas/mesas-request';
import socketHandler from './services/socket/socket-handler';

// pages 
import MainTable from './pages/main_table/MainTable';
import SettingsPage from './pages/settings/SettingsPage';
import NoMatchPage from './pages/no_match_page/NoMatchPage';

// components 
import Loading from './components/utils/loading/Loading';

// const socketHandler = require('./services/socket/socket-handler');
/**
 * the main app container
 */
class App extends Component {
  /**
   * create a new instance
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      mesas: [],
      isFetching: true,
    };
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

  /**
   * fetch all the mesas from db
   */
  async loadMesas() {
    const mesas = await mesasRequest.fetchMesas();
    this.setState({
      mesas: mesas,
      isFetching: false,
    });
  }

  /**
   * update the mesas state
   * @param {number} mesaId
   * @param {string} newState
   */
  updateMesas(mesaId, newState) {
    const newMesas = this.state.mesas.map((mesa) => {
      if (mesa.id === mesaId) {
        mesa.state = newState;
      }
      return mesa;
    });
    this.setState({
      mesas: newMesas,
    });
  }

  /**
   * this method is called when a new state change is selected
   * in the given mesa row dropdown
   * @param {*} mesa
   * @param {*} action
   */
  changeStateSelected(mesa, action) {
    console.log('selected mesa = ', mesa.id);
    console.log('selected action = ', action);
    const mesaData = {
      mesaId: mesa.id,
      newState: action,
    };

    socketHandler.sendNotification('state_change', mesaData);
    this.updateMesas(mesa.id, action);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainTable}/>
        <Route path="/about" component={SettingsPage}/>
        <Route component={NoMatchPage}/>
      </Switch>
    );
  }
}

export default App;

