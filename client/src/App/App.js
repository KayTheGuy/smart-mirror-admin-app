import React, { Component } from 'react';
import Header from './Components/Header';
import Form from './Components/Form';

class App extends Component {
	state = {
		formDefaults: null,
		form: ''
	};

	componentDidMount = () => {
		// this.callApi();
	}
	
	formSelectHandler = (formType) => {
		this.setState({form: formType, formDefaults: null});
	}

	callApi = async () => {
		fetch('forms/type')
		.then(response => { return response.json(); })
		.then(myJson => { this.setState({ formDefaults: myJson[0]});})
		.catch(err => { console.log(err); });
	}

	render = () => {
		let formAttributes = {
			header: 'event',
			imageUploader: true,
			datePicker: true,
			fields: ['title', 'description', 'location'],
			formDefaults: this.state.formDefaults
		}
		if (this.state.form === 'news') {
			formAttributes = {
				header: 'news',
				imageUploader: true,
				datePicker: true,
				fields: ['title', 'description'],
				formDefaults: this.state.formDefaults
			}
		} else if (this.state.form === 'info') {
			formAttributes = {
				header: 'info',
				imageUploader: false,
				datePicker: false,
				fields: ['title', 'description'],
				formDefaults: this.state.formDefaults
			}
		}
		return (
			<div className="app">
				<Header formSelectHandler={this.formSelectHandler}/>
				<Form formAttributes={formAttributes}/>
			</div>
		);
	}
}

export default App;
