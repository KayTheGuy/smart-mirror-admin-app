import React, {Component} from 'react';
import Selector from './Selector';
import logo from '../images/logo.png';

class Header extends Component {
	render = () => {
		return (
			<div className="header">
			<img className="logo" src={logo} alt="logo"/>
			<Selector formSelectHandler={this.props.formSelectHandler}/>
			</div>
		);
	}
}

export default Header;
