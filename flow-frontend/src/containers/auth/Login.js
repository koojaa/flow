import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthModal from '../../components/auth';
import { changeInput, resetForm } from '../../store/modules/auth';

class Login extends Component {
	handleChange = e => {
		const { changeInput } = this.props;
		const { name, value } = e.target;
		changeInput({ type: 'login', key: name, value });
	};

	handleSubmit = e => {
		e.preventDefault();
	};

	render() {
		const { handleChange, handleSubmit } = this;
		return (
			<AuthModal
				type="login"
				form={this.props.login}
				onChange={handleChange}
				onSubmit={handleSubmit}
			/>
		);
	}
}

const mapStateToProps = state => ({
	login: state.auth.login
});

const mapDispatchToProps = {
	changeInput,
	resetForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
