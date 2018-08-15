import React, {Component} from 'react';
import { } from 'react-bootstrap';

class Selector extends Component  {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			selected: 'Event',
			itemsShow: {
				'Event': false,
				'Info': true,
				'News': true,
			}
		};
	}

	hasFocus = (target) => {
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

	handleSelection = (selected) => {
		let previousSelected = this.state.selected;
		let tmp = this.state.itemsShow;
		tmp[previousSelected] = true;
		tmp[selected] = false;
		this.setState({selected: selected, itemsShow: tmp});
		this.props.formSelectHandler(selected);
	}

	render = () => {
		let items = [];
		for (let key in this.state.itemsShow) {
			if (this.state.itemsShow[key]) {
			items.push(<a onClick={() => {this.handleSelection(key)}} className="dropdown-item" >{key}</a>);
			}
		}

		return (
			<span className={`dropdown ${this.state.show ? 'show' : ''}`} ref={(dropdown) => this.dropdown = dropdown}>
			<button
				className="dropdown-toggle"
				type="button"
				id="dropDownMenuButton"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded={this.state.show}
				onClick={this.toggleDropdown}>
				{this.state.selected}
			</button>
			<span
				className="dropdown-menu"
				aria-labelledby="dropDownMenuButton">
				{items}
			</span>
			</span>
		);
	}
}

export default Selector;
