import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class TextField extends Component {

	handleChange = (e) => {
		this.props.onChangeHandler(this.props.txt, e.target.value);
	}

	render = () => {
		let fieldVal = `Enter ${this.props.txt} ... `;
		if (this.props.default) {
			fieldVal = this.props.default
		}
		return (
			<FormGroup controlId={this.props.id}>
			<ControlLabel>{this.props.title}</ControlLabel>
			<FormControl 
				componentClass="textarea" 
				placeholder={fieldVal} 
				onChange={this.handleChange}    
			/>
			<FormControl.Feedback />
			</FormGroup>
		)
	}
}

export default TextField;
