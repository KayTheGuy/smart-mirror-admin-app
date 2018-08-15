import React, { Component } from 'react';
import Header from './Components/Header';
import Form from './Components/Form';

class App extends Component {
	state = {
		formDefaults: null,
		form: ''
	};

	componentDidMount = () => {
	}

	formSelectHandler = (formType) => {
		this.setState({form: formType, formDefaults: null});
	}

	getForms = async () => {
		fetch('forms/type')
		.then(response => { return response.json(); })
		.then(myJson => { this.setState({ formDefaults: myJson[0]});})
		.catch(err => { console.log(err); });
	}

	postForm = async (formType, payload) => {
		fetch(`form/${formType}`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		})
		.then(response => {})
		.catch(err => { console.log(err); });
	}

	render = () => {
		let formAttributes = {
			type: 'events',
			header: 'event',
			imageUploader: true,
			datePicker: true,
			fields: [{name: 'title', rows:1}, {name: 'description', rows: 6}, {name: 'location', rows: 1}],
			formDefaults: this.state.formDefaults
		}
		if (this.state.form === 'News') {
			formAttributes = {
				type: 'news',
				header: 'news',
				imageUploader: true,
				datePicker: true,
				fields: [{name: 'title', rows:1}, {name: 'description', rows: 6}],
				formDefaults: this.state.formDefaults
			}
		} else if (this.state.form === 'Info') {
			formAttributes = {
				type: 'info',
				header: 'info',
				imageUploader: false,
				datePicker: false,
				fields: [{name: 'title', rows:1}, {name: 'description', rows: 6}],
				formDefaults: this.state.formDefaults
			}
		}
		return (
			<div className="app">
				<Header formSelectHandler={this.formSelectHandler}/>
				<Form formAttributes={formAttributes} postHandler={this.postForm}/>
			</div>
		);
	}
}

export default App;
