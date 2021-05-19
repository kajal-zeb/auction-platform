import { Input, Form, Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Logo from '../../atoms/Logo/Logo';
import Sprite from '../../atoms/Sprite/Sprite';
import classes from './Login.module.scss';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
import { useHistory } from 'react-router-dom';
import ENV_CONFIG from '../../../config';
const { Text } = Typography;

const Login = () => {
	const [form] = Form.useForm();
	const history = useHistory();

	// const patchExternalID = () => {
	// 	// let data = window.location.href // extract the id from here
	// 	localStorage.setItem('userexternalid',1) // temp until we get it from url
	// }

	const onFinish = async (data) => {
		// if(!localStorage.getItem('userexternalid')) {
		// 	patchExternalID()
		// }
		let body = {
			attendeeId: localStorage.getItem('attendeeId'),
			code: data.code,
		};
		await axios
			.post(`${ENV_CONFIG.BASE_URL}${API_ENDPOINTS.VERIFY_CODE}`, body)
			.then(({ data }) => {
				if (data && data.data && Object.keys(data.data).length !== 0) {
					localStorage.setItem('USER', JSON.stringify(data.data));
					history.push('/');
				} else {
					alert('Failed to verify code. ');
				}
			})
			.catch((err) => {
				console.log('Verify code Err : ', err);
			});
	};

	return (
		<div className={`${classes.loginView}`}>
			<Logo width={150} height={'auto'} />
			<div className={`${classes.inputArea}`}>
				<Text>
					A verification code has been sent to your email. Please enter the code
					below to continue...
				</Text>
				<Form
					initialValues={{
						code: '',
						remember: true,
					}}
					name='login'
					form={form}
					onFinish={onFinish}
				>
					<Form.Item name={'code'}>
						<Input
							size={'large'}
							className={`${classes.inputField}`}
							placeHolder={'ENTER CODE'}
						/>
					</Form.Item>
					<Form.Item className={'mt10'}>
						<Button
							htmlType='submit'
							className={`${classes.inputField} ${classes.button}`}
						>
							SUBMIT
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Login;
