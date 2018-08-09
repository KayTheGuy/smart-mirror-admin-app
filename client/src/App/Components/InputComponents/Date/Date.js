import React, {Component} from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Date extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return(
     <DatePicker
      selected={this.state.date}
      onChange={this.handleChange}
      showTimeSelect
      dateFormat="LLL" />
    );
  }
}

export default Date;
