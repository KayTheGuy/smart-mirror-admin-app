import React, {Component} from 'react';
import { } from 'react-bootstrap';

class Selector extends Component  {
    constructor(props) {
      super(props);
      this.state = {
        show: false
      };
    }

    hasFocus = (target) => {
      // React ref callbacks pass `null` when a component unmounts, so guard against `this.dropdown` not existing
      if (!this.dropdown) {
        return false;
      }
      var dropdownHasFocus = false;
      var nodeIterator = document.createNodeIterator(this.dropdown, NodeFilter.SHOW_ELEMENT, null, false);
      var node;

      while(node === nodeIterator.nextNode()) {
        if (node === target) {
          dropdownHasFocus = true;
          break;
        }
      }
      return dropdownHasFocus;
    }

    toggleDropdown = () => {
      this.setState({
        show: !this.state.show
      });
    }

    render = () => {
      return (
        <div className={`dropdown ${this.state.show ? 'show' : ''}`} ref={(dropdown) => this.dropdown = dropdown}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={this.state.show}
            onClick={this.toggleDropdown}>
            Select Form
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton">
            <a onClick={() => {this.props.handleSelection("news")}} className="dropdown-item" >News</a>
            <a onClick={() => {this.props.handleSelection("event")}} className="dropdown-item" >Event</a>
            <a onClick={() => {this.props.handleSelection("info")}} className="dropdown-item" >Info</a>
          </div>
        </div>
      );
    }
  }

export default Selector;
