import React, {Component} from 'react';
import Selector from "../../Components/InputComponents/Selector/Selector";
import Event from "../../Components/Event/Event"


class AdminPage extends Component {

  constructor(props) {
    super(props);

    this.state={
      form:""
    }
  }

  handleSelection(selection) {
    this.setState({form: selection})
  }

  renderForm () {
    console.log(this.state.form);

    if(this.state.form === "event") {
      return( <Event/>)
    }
    else if(this.state.form === "news") {
      return(<div>news</div>)
    }
    else if(this.state.form === "info") {
      return(<div>info</div>)
    }

  }

  render(){
    return (
    <div className="Admin-page">
      <Selector
        handleSelection={this.handleSelection.bind(this)}
      />
      {this.renderForm()}
    </div>

  );


  }
}

export default AdminPage;
