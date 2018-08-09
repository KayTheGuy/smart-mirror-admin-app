import React, {Component} from 'react';
import './Event.css';
import Date from "../InputComponents/Date/Date"


class Event extends Component {

  render() {
    return (
      <div className="event-page">
    <Date/>
  </div>
  )

  }
}



export default Event;
