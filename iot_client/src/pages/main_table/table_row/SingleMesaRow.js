import React, {Component} from 'react';
import PropTypes from 'prop-types';

/* styles */
import './mesa-row.css';

/* components */
import StateActions from './StateActions';

/**
 * a single table row to show the mesa data
 */
export default class SingleMesaRow extends Component {
  /**
   * create a new instance
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.renderStateColor = this.renderStateColor.bind(this);
    this.changeStateSelected = this.changeStateSelected.bind(this);
    this.deleteMesa = this.deleteMesa.bind(this);
  }

  /**
   * change the state of the given table
   * @param {*} action
   */
  changeStateSelected(action) {
    this.props.onChangeStateSelected(this.props.mesa, action);
  }

  /**
   * render the table color depending of the table state color
   * @param {string} color
   * @return {string} the classname to render the given color
   */
  renderStateColor(color) {
    let tagClass = 'tag is-medium';

    switch (color) {
    case 'red':
      return tagClass + ' is-danger';

    case 'flashing-red':
      return tagClass + ' is-black';

    case 'green':
      return tagClass + ' is-success';

    case 'flashing-green':
      return tagClass + ' is-warning';

    case 'blue':
      return tagClass + ' is-link';

    default:
      return;
    }
  }

  deleteMesa() {
    this.props.onDeleteMesa(this.props.mesa);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const id = this.props.mesa.id;
    const mesaState = this.props.mesa.getStateName();
    const color = this.props.mesa.getStateColor();

    return (
      <tr>
        <th>{id}</th>
        <td>
          <div className="state-column">
            <span className={this.renderStateColor(color)}>{mesaState}</span>
          </div>
        </td>
        <td>
          <StateActions onChangeStateSelected={this.changeStateSelected} />
        </td>
        <td>
          <div className="field is-grouped">
            <p className="control">
              <a className="button is-warning">
                Editar
              </a>
            </p>
            <p className="control">
              <a 
                className="button is-danger"
                onClick={this.deleteMesa}
                >
                Borrar
              </a>
            </p>
          </div>
        </td>
      </tr>
    );
  }
}

SingleMesaRow.propTypes = {
  onChangeStateSelected: PropTypes.func,
  mesa: PropTypes.object,
};
