import React, {Component} from 'react';
import Selector from "../../Components/Selector/Selector";
import EventForm from "../../Components/Event/Event"

class AdminPage extends Component {


  render(){
    return (
    <div className="Admin-page">
    <Selector/>
    <EventForm/>
    </div>

  );


  }
}

export default AdminPage;
