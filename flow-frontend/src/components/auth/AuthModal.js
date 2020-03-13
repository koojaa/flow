import React, { Component } from 'react';
import Input from '../common/Input';
import Paper from '../common/Paper';
import Template from '../common/Template';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import './AuthModal.scss';

class AuthModal extends Component {
	render() {
		return (
			<Template>
				<Paper>
					<h1 className="title">회원가입</h1>
					<form className="auth-modal">
						<Input full placeholder="아이디" />
						<Input full placeholder="비밀번호" />
						<Input full placeholder="비밀번호 확인" />
						<Button full marginTop>
							회원가입
						</Button>
						<Link className="auth-button">로그인</Link>
					</form>
				</Paper>
			</Template>
		);
	}
}

export default AuthModal;
