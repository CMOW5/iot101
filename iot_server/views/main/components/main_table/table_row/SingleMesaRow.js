import React, {Component} from 'react';

/* styles */
import './mesa-row.css';

/* components */
import StateActions from './StateActions';

export default class SingleMesaRow extends Component {
  constructor(props) {
    super(props);
    this.renderStateColor = this.renderStateColor.bind(this);
    this.selectedAction = this.selectedAction.bind(this);
  }

  selectedAction(action) {
    this.props.onSelectedAction(this.props.mesa, action);
  }

  renderStateColor(color) {
    let tagClass = 'tag is-medium';

    switch(color) {
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
        <td><StateActions onSelectedAction={this.selectedAction} /></td>
      </tr>
    );
  }
}