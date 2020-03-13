import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

class App extends Component {
	render() {
		return (
			<div>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</div>
		);
	}
}

export default App;
