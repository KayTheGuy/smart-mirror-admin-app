import React, { Component } from 'react';
import './App.css';
import AdminPage from './Components/AdminPage/AdminPage'

class App extends Component {
  state = {
    response: '',
  };

  componentDidMount() {
    this.callApi();
  }

  callApi = async () => {
    fetch('forms/type')
      .then(response => { return response.json(); })
      .then(myJson => { this.setState({ response: myJson[0]._id}); })
      .catch(err => { console.log(err); });
  }

  render() {
      return (
        <div className="App">
          <header className="App-header">Some header here...</header>
            <AdminPage/>
        </div>
      );
  }
}

export default App;
