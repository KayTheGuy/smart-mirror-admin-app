import React, { Component } from 'react';
import Header from './Components/Header';
import Form from './Components/Form';

class App extends Component {
	state = {
		response: '',
		form: ''
	};

	componentDidMount = () => {
		// this.callApi();
	}

	formHandler = (formType) => {
		this.setState({form: formType});
	}

	callApi = async () => {
		fetch('forms/type')
		.then(response => { return response.json(); })
		.then(myJson => { this.setState({ response: myJson[0]._id}); })
		.catch(err => { console.log(err); });
	}

	render = () => {
		let formAttributes = {
			header: 'event',
			imageUploader: true,
			fields: ['title', 'description', 'location', 'date']
		}
		if (this.state.form === 'news') {
			formAttributes = {
				header: 'news',
				imageUploader: true,
				fields: ['title', 'description', 'date']
			}
		} else if (this.state.form === 'info') {
			formAttributes = {
				header: 'info',
				imageUploader: false,
				fields: ['title', 'description']
			}
		}
		return (
			<div className="app">
				<Header formHandler={this.formHandler}/>
				<Form formAttributes={formAttributes}/>
			</div>
		);
	}
}

export default App;
