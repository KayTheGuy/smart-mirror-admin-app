import React, {Component} from 'react';
import './Event.css';
import EventForm from './EventForm'

class Event extends Component {

  render() {
    const fields = [
      {
        label: 'Event Title',
        input: <input className="event-title" type="text" placeholder="Insert Event Title" />

      },
      {
        label: 'Event Description',
        input: <input className="event-title" type="text" placeholder="Insert Event Title" />

      }
    ]
    return (

      <EventForm
        fields={fields}
        submitLabel="Submit"
        resetLabel="Clear"
        onSubmit={({values}) => console.warn(values)}
      />

  
    )
  }
}



export default Event;
