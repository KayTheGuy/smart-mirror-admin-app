import moment from 'moment';
import React, {Component} from 'react';
import UploadImage from './UploadImage';
import TextField from './TextField';
import DateTime from 'react-datetime';
import './DateTime.css';
import {Grid, Row, Col} from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'fileIds': [],
			'files': [],
			formDict: {
				'date': new moment().format('MMMM Do YYYY h:mm A')
			},
			'formDateErr': false
		}
	}

	handleSubmit = (e) => {
		this.props.postHandler(this.props.formAttributes.type, this.state.formDict, this.state.files);
	}

	inputChangeHandler = (key, val) => {
		let tmp = this.state.formDict;
		tmp[key] = val;
		if (!this.props.formAttributes.datePicker) {
			delete tmp.date;
		}
		this.setState({formDict: tmp});
	}

	handleDateChange = inputMoment => {
		if (inputMoment) {
			let tmp = this.state.formDict;
			try {
				tmp.date = inputMoment.format('MMMM Do YYYY h:mm A');
				this.setState({formDateErr: false});
			} catch (error) {
				// invalid input => replace it with new moment
				tmp.date = new moment().format('MMMM Do YYYY h:mm A');
				this.setState({formDateErr: true});
			}
			this.setState({formDict: tmp});
		}
	}

	handleImages = files => {
		files.forEach(f => this.handleImage(f));
	}

	handleImage = file => {
		// to avoid duplicate uploads from UploadImage use filename+size as a unique id
		let fileId = file.name + file.size;
		if (!this.state.fileIds.includes(fileId)) {
			let prevFiles = this.state.files;
			let prevFileIds = this.state.fileIds;
			prevFileIds.push(fileId);
			prevFiles.push(file);
			this.setState({fileIds: prevFileIds, files: prevFiles});
		}
	}

	render = () => {
		let input = this.props.formAttributes;
		let defaults = this.props.formAttributes.formDefaults;
		let header = this.capitalizeFirstLetter(input.header);
		let imgUploader = <span></span>;
		let datePicker = <span></span>;
		let datePickerAndImageUploader = <span></span>;
		let datePickerAndImageUploaderLabel = '';
		if (this.props.formAttributes.imageUploader) {
			imgUploader = <UploadImage uploadHandler={this.handleImages}/>;
			datePickerAndImageUploaderLabel = 'Images';
		}
		if (this.props.formAttributes.datePicker) {
			datePickerAndImageUploaderLabel = 'Date';
			datePicker = <DateTime
				input={false}
				className={"date-input"}
				dateFormat="MMMM Do YYYY"
				defaultValue={this.state.formDict.date}
				onChange={this.handleDateChange}
			/>;
		}
		if (this.props.formAttributes.datePicker || this.props.formAttributes.imageUploader) {
			if (this.props.formAttributes.datePicker && this.props.formAttributes.imageUploader) {
				datePickerAndImageUploaderLabel = 'Date & Images';
			}
			datePickerAndImageUploader = (
				<div>
					<label>{datePickerAndImageUploaderLabel}</label><br/>
					<div id="datepicker-div">
						<Grid>
						<Row className="show-grid">
						<Col xs={6} md={6}>{datePicker}</Col>
						<Col xs={6} md={6}>{imgUploader}</Col>
						</Row>
						</Grid>
					</div>
				</div>
			);
		}
		let formElements = input.fields.map(a =>
			<TextField 
				key={header.concat(this.capitalizeFirstLetter(a.name))}
				id={input.header.concat(this.capitalizeFirstLetter(a.name))}
				title={this.capitalizeFirstLetter(a.name)}
				txt={a.name}
				rows={a.rows}
				default={defaults ? defaults[a] : null}
				onChangeHandler={this.inputChangeHandler}
			/>
		);
		return (
			<div className="content">
				<Grid>
					<Row className="show-grid">
					<Col xs={1} md={1}></Col>
					<Col xs={10} md={10}>
						<form onSubmit={this.handleSubmit}>
							{formElements}
							{datePickerAndImageUploader}
							<div className="submit-div">
								<button 
									className="form-buttons"
									type="submit"
								>
								Submit
								</button>
							</div>
						</form>
					</Col>
					<Col xs={1} md={1}></Col>
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
