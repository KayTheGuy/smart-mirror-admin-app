import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class TextField extends Component {
	render = () => {
		return (
            <form>
                <FormGroup controlId={this.props.id}>
                <ControlLabel>{this.props.title}</ControlLabel>
                <FormControl componentClass="textarea" placeholder={`Insert ${this.props.txt}...`} />
                </FormGroup>
            </form>
		)
    }
}

export default TextField;
