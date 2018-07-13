import React, {Component} from 'react';

/* services */
const socketHandler = require('../../services/socket/socket-handler');

/* models */
import Mesa from '../../models/mesa';

/* components */
import SingleRow from './table_row/SingleRow';

export default class MainTable extends Component {
  constructor(props) {
    super(props);
    this.setState = this.selectedAction.bind(this);
    this.selectedAction = this.selectedAction.bind(this);
  }

  selectedAction(mesa, action) {
    // socket.emit('chat message', 'message from socket');
    // socketHandler.sendNotification('chat message', action);
    this.props.onSelectedAction(mesa, action);
  }

  render() {

    const mesasRows = this.props.mesas.map((mesa) => {
      const mesaObject = new Mesa(mesa.number, mesa.state);
      return (<SingleRow 
              mesa={mesaObject} 
              key={mesa.number}
              onSelectedAction={this.selectedAction}
            />);
    });

    return (
      <div>
        <table className="table table is-bordered">
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Estado</th>
              <th>Acciones</th>
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