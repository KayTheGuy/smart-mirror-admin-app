import React, {Component} from 'react';
import UploadImage from './UploadImage';
import TextField from './TextField';
import {Grid, Row, Col} from 'react-bootstrap';

class Form extends Component {
	render = () => {
        let header = this.capitalizeFirstLetter(this.props.formAttributes.header);
        let uploadImageForm = <span></span>;
        if (this.props.formAttributes.imageUploader) {
            uploadImageForm = <UploadImage/>;
        }
        let formElements = this.props.formAttributes.fields.map(a =>
            <TextField
                key={header.concat(this.capitalizeFirstLetter(a))}
                id={this.props.formAttributes.header.concat(this.capitalizeFirstLetter(a))}
                title={this.capitalizeFirstLetter(a)}
                txt={a}
            />
        );
		return (
			<div className="content">
				<Grid>
					<Row className="show-grid">
					<Col xs={1} md={2}></Col>
					<Col xs={10} md={8}>
						<h3>{header}</h3>
						<br/>
						<br/>
                        {formElements}
                        {uploadImageForm}
					</Col>
					<Col xs={1} md={2}></Col>
					</Row>
				</Grid>
			</div>
		)
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export default Form;
