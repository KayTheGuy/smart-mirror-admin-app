import React, {Component} from 'react';
import { } from 'react-bootstrap';

class Selector extends Component  {
  constructor(props) {
      super(props);

      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.handleMouseEvent = this.handleMouseEvent.bind(this);
      this.handleBlurEvent = this.handleBlurEvent.bind(this);
      this.hasFocus = this.hasFocus.bind(this);

      this.state = {
        show: false
      };
    }

    componentDidMount() {
      // handles mouse events like click and dblclick
      document.addEventListener('mouseup', this.handleMouseEvent);
      // handles tabbing out of
      this.dropdown.addEventListener('focusout', this.handleBlurEvent);
    }

    hasFocus(target) {
      // React ref callbacks pass `null` when a component unmounts, so guard against `this.dropdown` not existing
      if (!this.dropdown) {
        return false;
      }
      var dropdownHasFocus = false;
      var nodeIterator = document.createNodeIterator(this.dropdown, NodeFilter.SHOW_ELEMENT, null, false);
      var node;

      while(node = nodeIterator.nextNode()) {
        if (node === target) {
          dropdownHasFocus = true;
          break;
        }
      }

      return dropdownHasFocus;
    }

    handleBlurEvent(e) {
      var dropdownHasFocus = this.hasFocus(e.relatedTarget);

      if (!dropdownHasFocus) {
        this.setState({
          show: false
        });
      }
    }

    handleMouseEvent(e) {
      var dropdownHasFocus = this.hasFocus(e.target);

      if (!dropdownHasFocus) {
        this.setState({
          show: false
        });
      }
    }

    toggleDropdown() {
      this.setState({
        show: !this.state.show
      });
    }

    render() {
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
            Dropdown button
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton">
            <a onClick={() => {this.props.handleSelection("news")}} className="dropdown-item" >News</a>
            <a onClick={() => {this.props.handleSelection("event")}} className="dropdown-item" >Event</a>
            <a onClick={() => {this.props.handleSelection("info")}} className="dropdown-item" >Information</a>
          </div>
        </div>
      );
    }

  }

export default Selector;
