import { Input, Form, Button } from 'antd';
import React from 'react';
import Logo from '../../atoms/Logo/Logo';
import Sprite from '../../atoms/Sprite/Sprite';
import classes from './Login.module.scss';

const Login = () => {
	const [form] = Form.useForm();
	const onFinish = (data) => {
		console.log(data);
	};

	return (
		<div className={`${classes.loginView}`}>
			<Logo width={150} height={'auto'} />
			<div className={`${classes.inputArea}`}>
				<Form
					initialValues={{
            username: '',
						code: '',
						remember: true,
					}}
					name='login'
					form={form}
					onFinish={onFinish}
				>
					<Form.Item name={'username'}>
						<Input
							size={'large'}
							className={`${classes.inputField}`}
							placeHolder={'ENTER CRYPTO NAME'}
						/>
					</Form.Item>
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
