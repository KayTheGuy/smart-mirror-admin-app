import React, {Component} from 'react';
import UploadImage from './UploadImage';
import TextField from './TextField';
import DatePicker from './DatePicker/DatePicker';
import {Grid, Row, Col} from 'react-bootstrap';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
				formDict: {}
		}
	}

	handleSubmit = (e) => {
		console.log(this.state.formDict);
		alert('... ');
	}

	inputChangeHandler = (key, val) => {
		let tmp = this.state.formDict;
		tmp[key] = val;
		this.setState({formDict: tmp});
	}

	render = () => {
		let input = this.props.formAttributes;
		let defaults = this.props.formAttributes.formDefaults;
		let header = this.capitalizeFirstLetter(input.header);
		let imgUploader = <span></span>;
		let datePicker = <span></span>;
		if (this.props.formAttributes.imageUploader) {
			imgUploader = <UploadImage/>;
		}
		if (this.props.formAttributes.datePicker) {
			datePicker = <div>Date<br/><DatePicker/></div>;
		}
		let formElements = input.fields.map(a =>
			<TextField 
				key={header.concat(this.capitalizeFirstLetter(a))}
				id={input.header.concat(this.capitalizeFirstLetter(a))}
				title={this.capitalizeFirstLetter(a)}
				txt={a}
				default={defaults ? defaults[a] : null}
				onChangeHandler={this.inputChangeHandler}
			/>
		);
		return (
			<div className="content">
				<Grid>
					<Row className="show-grid">
					<Col xs={1} md={2}></Col>
					<Col xs={10} md={8}>
						<h3>{header}</h3>
						<br/><br/>
						<form onSubmit={this.handleSubmit}>
							{formElements}
							{datePicker}
							{imgUploader}
							<div className="submit-div">
								<button 
									type="submit"
									className="form-buttons"
								>
								Submit
								</button>
							</div>
						</form>
					</Col>
					<Col xs={1} md={2}></Col>
					</Row>
				</Grid>
			</div>
		)
	}

	capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}

export default Form;
