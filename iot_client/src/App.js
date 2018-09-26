import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// router
import { Switch, Route } from 'react-router'

// routes
import BaseRoutes from './router/routes/base_routes';
import SettingsRoutes from './router/routes/settings_routes';
import MesasRoutes from './router/routes/mesas_routes';

// services
import mesasRequest from './services/api/mesas/mesas-request';
import socketHandler from './services/socket/socket-handler';

// pages 
import MainTable from './pages/main_table/MainTable';
import SettingsPage from './pages/settings/SettingsPage';
import CreateMesaPage from './pages/mesas_pages/create_page/CreateMesaPage';
import NoMatchPage from './pages/no_match_page/NoMatchPage';

// components 
import NavBar from './components/navbar/NavBar';
import Loading from './components/utils/loading/Loading';

// styles
import './App.css';

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
    this.updateMesa = this.updateMesa.bind(this);
    this.changeStateSelected = this.changeStateSelected.bind(this);
    this.loadMesas = this.loadMesas.bind(this);
    this.onSendAllDisponibleCommand = this.onSendAllDisponibleCommand.bind(this);
  }

  /**
   * the component mounted successfully
   */
  componentDidMount() {
    socketHandler.socket.on('state_change', (mesaData) => {
      const {mesaId, newState} = mesaData;
      console.log('mesa id = ', mesaId);
      console.log('new state = ', newState);
      this.updateMesa(mesaId, newState);
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
   * update the given mesa state
   * @param {number} mesaId
   * @param {string} newState
   */
  updateMesa(mesaId, newState) {
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
    this.updateMesa(mesa.id, action);
  }

   /**
   * this method is called when in the navbar the all disponible
   * command is clicked, this sends a notification to update
   * all the mesas state
   * 
   */
  async onSendAllDisponibleCommand() {
    const mesas = await mesasRequest.fetchMesas();
    mesas.forEach((mesa) => {
      const mesaData = {
        mesaId: mesa.id,
        newState: 'disponible',
      };
      socketHandler.sendNotification('state_change', mesaData);
    });
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div className="App">
        <NavBar 
          onSendAllDisponibleCommand = {this.onSendAllDisponibleCommand}
        />
        <div className="container">
          <Switch>
            <Route exact path={BaseRoutes.base()} component={MainTable}/>
            <Route path={SettingsRoutes.base()} component={SettingsPage}/>
            <Route path={MesasRoutes.create()} component={CreateMesaPage}/>
            <Route component={NoMatchPage}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

