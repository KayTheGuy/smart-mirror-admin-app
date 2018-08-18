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

	getForms = async (formType) => {
		fetch(`/forms/${formType}`)
		.then(response => { return response.json(); })
		.then(myJson => { this.setState({ formDefaults: myJson[0]}); })
		.catch(err => { console.log(err); });
	}
	
	postData = (url, data) => {
		fetch(url, {
			method: "POST",
			body: data
		})
		.then(response => {alert(response.status)})
		.catch(err => { alert(err);});
	 }

	 makeForm = (formType, body, files) => {
		var data = new FormData();
		data.append('formFields', JSON.stringify(body));
		for (var i in files) {
			data.append('files', files[i], files[i].name);
		}
		var url = `/form/${formType}/${Date.now().toString()}`;
		this.postData(url, data);
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
				<Form formAttributes={formAttributes} postHandler={this.makeForm}/>
			</div>
		);
	}
}

export default App;
