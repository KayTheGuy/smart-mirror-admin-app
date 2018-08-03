import React, { Component } from 'react';
import './App.css';
import AdminPage from './Container/AdminPage/AdminPage'

class App extends Component {
  state = {
    response: '',
    loading: true
  };

  componentDidMount() {
    this.callApi();
  }

  callApi = async () => {
    fetch('/api/test')
      .then(response => { return response.json(); })
      .then(myJson => { this.setState({ response: myJson.a}); })
      .catch(err => { console.log(err); });
  }

  render() {
      return (
        <div className="App">
          <header className="App-header">Some header here...</header>
          <p className="App-intro">{this.state.response}</p>

            <AdminPage/>
          
        </div>
      );
  }
}

export default App;
