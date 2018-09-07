import React, {Component} from 'react';

// router
import {withRouter} from 'react-router-dom';
import RouterHandler from '../../router/router_handler';

// routes
import BaseRoutes from '../../router/routes/base_routes';
import SettingsRoutes from '../../router/routes/settings_routes';
import MesasRoutes from '../../router/routes/mesas_routes';

class NavBar extends Component {

  goToMainTablePage = () => {
    const route = BaseRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  goToSettings = () => {
    const route = SettingsRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  goToRegisterNewMesa = () => {
    const route = MesasRoutes.create();
    RouterHandler.goTo(this.props.history, route);
  }

  render() {
    return (
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item">
            <i className="fa fa-utensils" ></i>
          </a>
          <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-start">
            <a onClick = {this.goToMainTablePage} className="navbar-item">
              Home
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                Admin
              </a>
              <div className="navbar-dropdown is-boxed">
                <a 
                  className="navbar-item"
                  onClick = {this.goToSettings}
                  >
                  Ajustes
                </a>
                <a 
                  className="navbar-item"
                  onClick = {this.goToRegisterNewMesa}
                  >
                  Crear mesa
                </a>
              </div>
            </div>
          </div>

        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);