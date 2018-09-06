import React, { Component } from 'react';

// api helper
import ConfigApi from '../../services/api/config/config_api';

// router
import {withRouter} from 'react-router-dom';
import RouterHandler from '../../router/router_handler';

// routes
import SettingsRoutes from '../../router/routes/settings_routes';

// utils
import Form from '../../utils/form/form';

/* components */
import Loading from '../../components/utils/loading/Loading';
import LoadingModal from '../../components/modals/loading/LoadingModal';
import SimpleNotification
  from '../../components/modals/simple_notification/SimpleNotification';

/**
 * the settings page
 */
class SettingsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: {
        wifiNetwork: "",
        wifiPassword: "",
        mqttServer: "",
        mqttPort: "",
        mqttUser: "",
        mqttKey: "",
      },
      form: new Form({}),
      isFetching: true,
      showEditingModal: false,
      showEditedModal: false,
    }

    // method bindings
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.reloadSettingsPage = this.reloadSettingsPage.bind(this);
  }

  async componentDidMount() {
    const config = await ConfigApi.fetchConfig();
    this.setState({config: config});
  }

  /**
   * handle the changes in the form fields
   * @param {*} event
   */
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    
    let config = {...this.state.config}
    config[name] = value;
    this.setState({config});
  }

  /**
   * handle the changes in the form fields
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();

    let form = new Form(this.state.config);
    form.setPutMethod();

    this.setState((prevState) => ({
      form: form,
      showEditingModal: true,
    }), this.submitForm);
  }

  submitForm() {
    ConfigApi.update(this.state.config)
      .then((updatedConfig) => {
        console.log('info updated = ', updatedConfig);
        this.setState({
          showEditedModal: true,
          showEditingModal: false,
        });
      });
  }

  /**
   * redirect the user to the see settings page
   */
  reloadSettingsPage() {
    const route = SettingsRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  renderError() {
    return (
      <p className="help is-success">This username is available</p>
    );
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div>
        <div className="field">
          <label className="label">Red Wifi</label>
          <div className="control has-icons-left">
            <input 
              className="input" 
              type="text" 
              placeholder="Text input" 
              name="wifiNetwork"
              value={this.state.config.wifiNetwork || ''}
              onChange={this.handleInputChange}
              />
            <span className="icon is-small is-left">
              <i className="fas fa-wifi"></i>
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Contraseña</label>
          <div className="control has-icons-left has-icons-right">
            <input 
              className="input" 
              type="password" 
              placeholder="Text input" 
              name="wifiPassword"
              value={this.state.config.wifiPassword || ''}
              onChange={this.handleInputChange}
              />
            <span className="icon is-small is-left">
              <i className="fas fa-unlock"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-eye"></i>
            </span>
          </div>
          
        </div>

        <div className="field">
          <label className="label">Mqtt Server</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              placeholder="Text input"
              name="mqttServer" 
              value={this.state.config.mqttServer || ''}
              onChange={this.handleInputChange}
              />
          </div>
        </div>

        <div className="field">
          <label className="label">Mqtt Port</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              placeholder="Text input" 
              name="mqttPort" 
              value={this.state.config.mqttPort || ''}
              onChange={this.handleInputChange}
              />
          </div>
        </div>

        <div className="field">
          <label className="label">Mqtt Username</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              placeholder="Text input" 
              name="mqttUser" 
              value={this.state.config.mqttUser || ''}
              onChange={this.handleInputChange}
              />
          </div>
        </div>

        <div className="field">
          <label className="label">Mqtt Key</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              placeholder="Text input" 
              name="mqttKey" 
              value={this.state.config.mqttKey || ''}
              onChange={this.handleInputChange}
              />
          </div>
        </div>


        <div className="field is-grouped">
          <div className="control">
            <button 
              className="button is-link"
              onClick={this.submitForm}  
              >
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-text">Cancel</button>
          </div>
        </div>

        <SimpleNotification
          show = {this.state.showEditedModal}
          message = "site edited!!"
          type = 'info'
          onConfirmationButtonClicked = {this.reloadSettingsPage}
          onCancelButtonClicked = {this.reloadSettingsPage}
        />

        <LoadingModal
          show = {this.state.showEditingModal}
          message = "editing the site data...please wait"
        />

      </div>
    );
  }
}

export default withRouter(SettingsPage);

