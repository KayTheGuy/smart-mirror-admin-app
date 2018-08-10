import React, { Component } from 'react';
import Header from './Components/Header';
import Event from './Components/Event';
import News from './Components/News';
import Info from './Components/Info';

class App extends Component {
	state = {
		response: '',
		form: ''
	};

	componentDidMount = () => {
		this.callApi();
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
		let form = <Event/>
		if (this.state.form === 'news') {
			form = <News/>;
		} else if (this.state.form === 'info') {
			form = <Info/>;
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
