import React, {Component} from 'react'
import Selector from "../../Components/Selector/Selector"
import Event from "../../Components/Event/Event"
import './AdminPage.css'

class AdminPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form:""
    }
  }

  handleSelection = selection => {
    this.setState({form: selection})
  }

  renderForm = () => {
    if(this.state.form === "event") {
      return(<Event/>)
    }
    else if(this.state.form === "news") {
      return(<div>news</div>)
    }
    else if(this.state.form === "info") {
      return(<div>info</div>)
    }
  }

  render = () => {
    return (
      <div className="Admin-page">
        <header className="App-header">
          <Selector handleSelection={this.handleSelection}/>
        </header>
        {this.renderForm()}
      </div>
    );
  }
}

export default AdminPage;
