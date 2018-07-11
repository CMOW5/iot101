import React, {Component} from 'react';

/* the mesa state machine */
// import Mesa from '../../../models/mesa';

/* components */
import StateActions from './StateActions';

export default class SingleRow extends Component {
  constructor(props) {
    super(props);
    this.renderStateColor = this.renderStateColor.bind(this);
    this.selectedAction = this.selectedAction.bind(this);
  }

  selectedAction(action) {
    console.log('selected action = ', action);
  }

  renderStateColor(color) {
    let tagClass = 'tag is-medium';

    switch(color) {
      case 'green':
        return tagClass + ' is-success'; 
      
      case 'flashing-green': 
        return tagClass + ' is-info'; 
      
      case 'yellow': 
        return tagClass + ' is-warning'; 
      
      case 'red': 
        return tagClass + ' is-danger'; 
      
      default:
        return;
    }
  }

  render() {

    const mesaNumber = this.props.mesa.number;
    const mesaState = this.props.mesa.getStateName();
    const color = this.props.mesa.getStateColor();
  
    return (
      <tr>
        <th>{mesaNumber}</th>
        <td>
          <div>
            <span className={this.renderStateColor(color)}>{mesaState}</span>
          </div>
        </td>
        <td><StateActions onSelectedAction={this.selectedAction} /></td>
      </tr>
    );
  }
}