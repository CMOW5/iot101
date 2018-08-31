import React, { Component } from 'react';

/**
 * the settings page
 */
class RegisterTablePage extends Component {
  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div>
        <div className="field">
          <label className="label">Numero de mesa</label>
          <div className="control">
            <input className="input" type="text" placeholder="Text input" />
          </div>
        </div>

        <div className="notification is-danger">
          No se ha detectado ningún dispositivo conectado
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Cargar</button>
          </div>
          <div className="control">
            <button className="button is-text">Cancelar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterTablePage;

