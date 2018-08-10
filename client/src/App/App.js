import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import Event from './Components/Event'

class App extends Component {
	state = {
		response: '',
		form: ''
	};

	componentDidMount = () => {
		this.callApi();
	}

	formHandler = () => {
		this.setState({form: 'event'});
		return (<Event/>);
	}

	callApi = async () => {
		fetch('forms/type')
		.then(response => { return response.json(); })
		.then(myJson => { this.setState({ response: myJson[0]._id}); })
		.catch(err => { console.log(err); });
	}

	render = () => {
		let form = <div></div>;
		if (this.state.form === 'event') {
			form = <Event/>;
		}
		return (
			<div className="app">
				<Header formHandler={this.formHandler}/>
				{form}
			</div>
		);
	}
}

export default App;
