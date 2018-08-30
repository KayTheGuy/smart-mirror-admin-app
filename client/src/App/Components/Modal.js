import React, { Component } from 'react';
import './Modal.css'

export default class Modal extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }


    return (
      <div className='modal-class'>
        <div>
          {this.props.children}
          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
