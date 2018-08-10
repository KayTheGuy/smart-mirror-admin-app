import React, {Component} from 'react';
import './Event.css';
import UploadImage from '../UploadImage/UploadImage'

import {FormGroup, ControlLabel,FormControl, Grid, Row, Col} from 'react-bootstrap';

class Event extends Component {
  render() {
    let currentDate = new Date();
    return (
      <div className="event-page">
        <Grid>
          <Row className="show-grid">
            <Col xs={1} md={2}></Col>
            <Col xs={10} md={8}>
              <FormGroup controlId="eventTitle">
                <ControlLabel>Event Title</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Inser title..." />
              </FormGroup>

              <FormGroup controlId="eventDescription">
                <ControlLabel>Event Description</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Inser Description..." />
              </FormGroup>

              <FormGroup controlId="eventLocation">
                <ControlLabel>Location</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Inser location..." />
              </FormGroup>

              <FormGroup controlId="eventDateAndTime">
                <ControlLabel>Date and Time</ControlLabel>
                <FormControl componentClass="textarea" placeholder={currentDate.toLocaleString()} />
              </FormGroup>
              <UploadImage/>
            </Col>
            <Col xs={1} md={2}></Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Event;
