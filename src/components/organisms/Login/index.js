import { Input, Form, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Logo from '../../atoms/Logo/Logo';
import Sprite from '../../atoms/Sprite/Sprite';
import classes from './Login.module.scss';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../api';
import { toast } from 'react-toastify';


const Login = () => {
	const [form] = Form.useForm();
	const patchExternalID = () => {
		// let data = window.location.href // extract the id from here
		localStorage.setItem('userexternalid',1) // temp until we get it from url
	}


	const onFinish = async (data) => {
		if(!localStorage.getItem('userexternalid')) {
			patchExternalID()
		}
		let body = {
			attendeeId: localStorage.getItem('userexternalid'),
			code: data.code,
		}
		await axios
			.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.VERIFY_CODE}`, body)
			.then(({ data }) => {
				if (data && data.data && Object.keys(data.data).length !== 0) {
					localStorage.setItem(
						'USER',
						JSON.stringify(data.data),
					);
				} else {
					// toast.success("Success Notification !", {  // it wasn't working lol
					// 	position: toast.POSITION.TOP_CENTER
					//   });
					alert('Failed to verify code. ')
				}
			})
			.catch((err) => {
				console.log('Verify code Err : ', err);
			});
	};

	useEffect(() => {
		if(localStorage.getItem('USER') && localStorage.getItem('userexternalid')) {
			// redirect to parent wrapper 
		}
	}, []);

	return (
		<div className={`${classes.loginView}`}>
			<Logo width={150} height={'auto'} />
			<div className={`${classes.inputArea}`}>
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
