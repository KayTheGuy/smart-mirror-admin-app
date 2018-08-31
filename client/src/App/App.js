import React, { Component } from 'react';
import Header from './Components/Header';
import Form from './Components/Form';

class App extends Component {

	getForms = async () => {
		fetch("/forms")
		.then(response => { return response.json(); })
		.then(myJson => { })
		.catch(err => { console.log(err); });
	}
	
	postData = (url, data) => {
		fetch(url, {
			method: "POST",
			body: data
		})
		.then(response => {}) //TODO: show message
		.catch(err => {});  //TODO: show error
	}

	 makeForm = (formType, body, files) => {
		var data = new FormData();
		for (var key in body) {
			data.append(key, body[key]);
		}
		for (var i in files) {
			data.append('files', files[i], files[i].name);
		}
		var url = `/form/${Date.now().toString()}`;
		this.postData(url, data);
	}

	render = () => {
		let formAttributes = {
			type: 'events',
			header: 'event',
			imageUploader: true,
			datePicker: true,
			fields: [{name: 'title', rows:1}, {name: 'description', rows: 6}, {name: 'location', rows: 1}]
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
