import React, { Component, StyleSheet } from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

class TextField extends Component {

	constructor(props, context) {
		super(props, context);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			value: '',
			isValid: false
		};
	}

	// handleChange(e) {
	// 	this.setState({ value: e.target.value });
	// }

	handleChange = (e) => {
		this.setState({ value: e.target.value })
		this.props.onChangeHandler(this.props.txt, e.target.value, this.state.isValid);
	}

	getValidationState = () => {
		const length = this.state.value.length;
		if (length > 5){
			if(this.state.isValid !== true) this.setState({isValid: true});
			if(length > 10) return 'success';
			else return 'warning';
		}
		else if (length > 0){
			if(this.state.isValid !== false) this.setState({isValid: false});
			return 'error';
		}
	}

	render = () => {

		const styles = {
		  pass: {
				fontSize: 10,
		    color: 'green',
		  },
		  warning: {
				fontSize: 10,
		    color: 'orange',
		  },
		  fail: {
				fontSize: 10,
		    color: 'red',
		  },
		};

		let fieldVal = `Enter ${this.props.txt} ... `;
		if (this.props.default) {
			fieldVal = this.props.default
		}
		return (
				<FormGroup controlId={this.props.id}
									 validationState={this.getValidationState()}
				 >
					<ControlLabel>{this.props.title}</ControlLabel>
					<FormControl
						value={this.state.value}
						componentClass="textarea"
						rows={this.props.rows}
						placeholder={fieldVal}
						onChange={this.handleChange}
					/>
					{
						this.getValidationState() === 'success'?
						(<span style={styles.pass}>youre good</span>):
						this.getValidationState() === 'warning'?
						(<span style={styles.warning}>warning</span>):
						this.getValidationState() === 'error'?
						(<span style={styles.fail}>too short</span>):
						(<span></span>)
					}
					<FormControl.Feedback />
				</FormGroup>
		)
	}
}

export default TextField;
