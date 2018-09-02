import React, { Component } from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import Modal from './Components/Modal';

class App extends Component {

	state = {
		showModal: false,
		modalMessage: null,
	}

	toggleModal = () => {
		this.setState({ showModal: false, modalMessage: null });
	}

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
		.then(response => {
			let msg = 'success';
			if(response.status !== 200){msg = 'fail'}
			this.setState({showModal: true, modalMessage: msg})
		})
		.catch(err => {this.setState({showModal: true, modalMessage: 'oops! There is something wrong.'})});
	 }

	 makeForm = (formType, body, files, isValid) => {
		 if(isValid) {
			var data = new FormData();
			for (var key in body) {
				data.append(key, body[key]);
			}
			for (var i in files) {
				data.append('files', files[i], files[i].name);
			}
			var url = `http://10.161.104.150:5000/form/${Date.now().toString()}`;
			this.postData(url, data);
		} else {
			this.setState({ showModal: true, modalMessage: 'some fields are invalid' })
		}
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
				<Form formAttributes={formAttributes} postHandler={this.makeForm} />
				<Modal show={this.state.showModal}
					onClose={this.toggleModal}>
					{this.state.modalMessage}
				</Modal>
			</div>
		);
	}
}

export default App;
