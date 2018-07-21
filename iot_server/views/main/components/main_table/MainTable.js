import React, {Component} from 'react';

/* styles */
import './main-table.css';

/* models */
import Mesa from '../../models/mesa';

/* components */
import SingleMesaRow from './table_row/SingleMesaRow';

export default class MainTable extends Component {
  constructor(props) {
    super(props);
    this.setState = this.selectedAction.bind(this);
    this.selectedAction = this.selectedAction.bind(this);
  }

  selectedAction(mesa, action) {
    this.props.onSelectedAction(mesa, action);
  }

  render() {

    const mesasRows = this.props.mesas.map((mesa) => {
      const mesaModel = new Mesa(mesa.id, mesa.state);
      return (<SingleMesaRow 
              mesa={mesaModel} 
              key={mesa.id}
              onSelectedAction={this.selectedAction}
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