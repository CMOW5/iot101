import React, {Component} from 'react';

export default class StateActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleSelectedAction = this.handleSelectedAction.bind(this);
  }

  toggleDropdown() {
    this.setState((prevState) => ({
      show: !prevState.show
    }));
  }

  /**
   * handle the changes in the form fields
   * @param {*} event
   */
  handleSelectedAction(event) {
    const target = event.target;
    const action = target.name;
    this.props.onSelectedAction(action);
  }

  render() {

    const showDropdown = this.state.show ? "dropdown is-active" : "dropdown";

    return (
      <div className={showDropdown}>
        <div className="dropdown-trigger">
          <button 
            onClick={this.toggleDropdown} 
            className="button" 
            aria-haspopup="true" 
            aria-controls="dropdown-menu">
            <span>acciones</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
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
            <hr className="dropdown-divider" />
            <a 
              onClick={this.handleSelectedAction}
              name = "no_disponible"
              className="dropdown-item">
              no disponible
            </a>
          </div>
        </div>
      </div>
    );
  }
}