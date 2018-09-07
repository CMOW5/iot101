import React, {Component} from 'react';
import PropTypes from 'prop-types';

/* styles */
import './main-table.css';

// services
import mesasRequest from '../../services/api/mesas/mesas-request';
import socketHandler from '../../services/socket/socket-handler';

/* models */
import Mesa from '../../models/mesa';

/* components */
import SingleMesaRow from './table_row/SingleMesaRow';
import Loading from '../../components/utils/loading/Loading';

/**
 * this component render a table with the mesas info
 */
export default class MainTable extends Component {
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
   * this method is called when the delete mesa button is clicked
   * in the given mesa row
   * @param {Mesa} mesa
   */
  deleteMesa(mesa) {
    console.log('delete mesa = ', mesa.id);
    mesasRequest.delete(mesa.id).then((response => {
      console.log(response);
    }));
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const mesasRows = this.state.mesas.map((mesa) => {
      const mesaModel = new Mesa(mesa.id, mesa.state);
      return (<SingleMesaRow
        mesa={mesaModel}
        key={mesa.id}
        onChangeStateSelected={this.changeStateSelected}
        onDeleteMesa={this.deleteMesa}
      />);
    });

    return (
      <div className="main-table">
        <table className="table table is-bordered">
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Estado</th>
              <th>Acciones</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {mesasRows}
          </tbody>
        </table>
      </div>
    );
  }
}

MainTable.propTypes = {
  onChangeStateSelected: PropTypes.func,
  mesas: PropTypes.array,
};
