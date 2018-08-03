import React, {Component} from 'react';


class EventForm extends Component {
  render() {
    const maxCol = 12;
    const currentSize = 0;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
        {this.props.fields.map( field => {
          return (
            <div className={`form-group col-lg-${field.size}`}>
              {field.label && <label className="control-label"> {field.label} </label>}
              {field.input}
            </div>
          )
        })}
        </div>
      </form>
    )
  }
}
export default EventForm;
