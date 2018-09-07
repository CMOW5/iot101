import React, { Component } from 'react';

// api helper
import ConfigApi from '../../../services/api/config/config_api';
import MesasRequest from '../../../services/api/mesas/mesas-request';

// router
import {withRouter} from 'react-router-dom';
import RouterHandler from '../../../router/router_handler';

// routes
import BaseRoutes from '../../../router/routes/base_routes';

// utils
import Form from '../../../utils/form/form';

/* components */
import Loading from '../../../components/utils/loading/Loading';
import LoadingModal from '../../../components/modals/loading/LoadingModal';
import SimpleNotification
  from '../../../components/modals/simple_notification/SimpleNotification';

/**
 * the settings page
 */
class CreateMesaPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mesa: "",
      form: new Form({}),
      isFetching: true,
      showEditingModal: false,
      showEditedModal: false,
      formError: null,
      connectionStatus: false,
    }

    // method bindings
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.goToMainTablePage = this.goToMainTablePage.bind(this);
    this.renderError = this.renderError.bind(this);
  }
  
  /**
   * handle the changes in the form fields
   * @param {*} event
   */
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    
    this.setState({
      [name]: value,
    });
  }

  verifyConnection = () => {
    MesasRequest.validateConnection()
      .then((response) => {
        this.setState({
          connectionStatus: true
        });
      }).catch((error) => {
        this.setState({
          connectionStatus: false
        });
      });
  }

  /**
   * handle the changes in the form fields
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      showEditingModal: true,
    }), this.submitForm);
  }

  submitForm() {
    const mesaData = {mesa: this.state.mesa}
    console.log('mesa data = ', mesaData);
    MesasRequest.create(mesaData)
      .then((createdMesa) => {
        console.log('mesa created = ', createdMesa);
        this.setState({
          showEditedModal: true,
          showEditingModal: false,
        });
      }).catch((error) => {
        this.setState({
          showEditingModal: false,
          formError: error.response.data.errors,
        });
        console.log('error = ', error.response.data.errors);
      });
  }

  /**
   * redirect the user to the see settings page
   */
  goToMainTablePage() {
    const route = BaseRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  renderError() {
    if (!this.state.formError) {
      return;
    }

    return (
      <p className="help is-danger">{this.state.formError}</p>
    );
  }

  renderConnectionStatus = () => {
    if (!this.state.connectionStatus) {
      return (
        <div className="notification is-danger">
          No se ha detectado ningún dispositivo conectado
          <br />
          <br />
          <button onClick = {this.verifyConnection} className="button is-info">Validar conexion</button>
        </div>
      );
    } else {
      return (
        <div className="notification is-success">
          Hay un dispositivo conectado
          <br />
          <br />
          <button onClick = {this.verifyConnection} className="button is-info">Validar conexion</button>
        </div>
      );
    }
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div>
        <div className="field">
          <label className="label">Numero de mesa</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              placeholder="Text input" 
              name="mesa"
              value={this.state.mesa || ''}
              onChange={this.handleInputChange}
              />
            {this.renderError()}
          </div>
        </div>

        {this.renderConnectionStatus()}

        <div className="field is-grouped">
          <div className="control">
            <button 
              className="button is-link"
              onClick = {this.handleSubmit}
              >Cargar</button>
          </div>
          <div className="control">
            <button className="button is-text">Cancelar</button>
          </div>
        </div>

        <SimpleNotification
          show = {this.state.showEditedModal}
          message = "mesa creada, reinicie el dispositivo!!"
          type = 'info'
          onConfirmationButtonClicked = {this.goToMainTablePage}
          onCancelButtonClicked = {this.goToMainTablePage}
        />

        <LoadingModal
          show = {this.state.showEditingModal}
          message = "creando la mesa...por favor espere"
        />

      </div>
    );
  }
}

export default withRouter(CreateMesaPage);

