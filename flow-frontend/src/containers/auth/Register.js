import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthModal from '../../components/auth';
import { changeInput, resetForm, registerThunk } from '../../store/modules/auth';

class Register extends Component {
	handleChange = e => {
		const { changeInput } = this.props;
		const { name, value } = e.target;
		changeInput({ type: 'register', key: name, value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { username, password } = this.props.register;
		const { registerThunk } = this.props;
		registerThunk({ username, password });
		this.props.resetForm('register');
	};

	render() {
		const { handleChange, handleSubmit } = this;
		return (
			<AuthModal
				type="register"
				form={this.props.register}
				onChange={handleChange}
				onSubmit={handleSubmit}
			/>
		);
	}
}

const mapStateToProps = state => ({
	register: state.auth.register
});

const mapDispatchToProps = {
	changeInput,
	resetForm,
	registerThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
