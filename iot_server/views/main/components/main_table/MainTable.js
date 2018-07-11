import React, {Component} from 'react';

/* models */
import Mesa from '../../models/mesa';

/* components */
import SingleRow from './table_row/SingleRow';

export default class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mesas: [
        {number: 1, state: 'disponible'}, 
        {number: 2, state: 'solicitando_servicio'}
      ],
    }
  }
  render() {

    const mesasRows = this.state.mesas.map((mesa) => {
      const mesaObject = new Mesa(mesa.number, mesa.state);
      return <SingleRow mesa = {mesaObject} key = {mesa.number} />;
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