import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './loading.css';

/**
 * this component shows a loading icon
 */
export default class Loading extends Component {
  /**
   * @return {ReactNode}
   */
  render() {
    const size = this.props.size ? this.props.size : 'fa-5x';
    const title = this.props.title ? this.props.title : '';

    return (
      this.props.show ?
        <div className="loading-container">
          <div className="loading-content">
            <i className={`fa fa-cog ${size} fa-spin`}></i>
            <div>cargando {title}</div>
          </div>
        </div>
        : null
    );
  }
}

Loading.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
};

