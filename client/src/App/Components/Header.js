import React, {Component} from 'react';
import Selector from './Selector';

class Header extends Component {
  render = () => {
    return (
      <div className="admin-page">
        <Selector formHandler={this.props.formHandler}/>
      </div>
    );
  }
}

export default Header;
