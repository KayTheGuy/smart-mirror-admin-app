import React, {Component} from 'react';
import UploadImage from './UploadImage'
import {FormGroup, ControlLabel, FormControl, Grid, Row, Col} from 'react-bootstrap';

class Event extends Component {
	render() {
		let currentDate = new Date();
		return (
			<div className="content">
				<Grid>
					<Row className="show-grid">
					<Col xs={1} md={2}></Col>
					<Col xs={10} md={8}>
						<FormGroup controlId="eventTitle">
						<ControlLabel>Title</ControlLabel>
						<FormControl componentClass="textarea" placeholder="Insert title..." />
						</FormGroup>

						<FormGroup controlId="eventDescription">
						<ControlLabel>Description</ControlLabel>
						<FormControl componentClass="textarea" placeholder="Insert Description..." />
						</FormGroup>

						<FormGroup controlId="eventLocation">
						<ControlLabel>Location</ControlLabel>
						<FormControl componentClass="textarea" placeholder="Insert location..." />
						</FormGroup>

						<FormGroup controlId="eventDateAndTime">
						<ControlLabel>Date & Time</ControlLabel>
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
