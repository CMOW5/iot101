import React, {Component} from 'react';

/* state actions */

export default class StateActions extends Component {
  constructor(props) {
    super(props);
    this.handleSelectedAction = this.handleSelectedAction.bind(this);
  }

  /**
   * handle the changes in the form fields
   * @param {*} event
   */
  handleSelectedAction(event) {
    const target = event.target;
    const action = target.name;
    this.props.onChangeStateSelected(action);
  }

  render() {
    return (
      <div className="dropdown is-hoverable">
        <div className="dropdown-trigger">
          <button 
            onClick={this.toggleDropdown} 
            className="button" 
            aria-haspopup="true" 
            aria-controls="dropdown-menu">
            <span>acciones</span>
            <span className="icon is-small">
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a 
              onClick={this.handleSelectedAction}
              name = "disponible"
              className="dropdown-item">
              disponible
            </a>
            <a 
              onClick={this.handleSelectedAction}
              name = "pedido_tomado"
              className="dropdown-item">
              pedido tomado
            </a>
            <a 
              onClick={this.handleSelectedAction}
              name = "atendido"
              className="dropdown-item">
              atendido
            </a>
            <hr className="dropdown-divider" />
            <a 
              onClick={this.handleSelectedAction}
              name = "alarma"
              className="dropdown-item">
              alarma
            </a>
          </div>
        </div>
      </div>
    );
  }
}