import { Input, Form, Button } from 'antd';
import React from 'react';
import Logo from '../../atoms/Logo/Logo';
import classes from '../Login/Login.module.scss';
import Text from '../../atoms/Text/Text';

const Reference = (props) => {
	const [form] = Form.useForm();
	const onFinish = async (data) => {
		console.log("ID > 1", data)
		localStorage.setItem('attendeeId', data.reference);
		props.onFinish();
	};

	return (
		<div className={`${classes.loginView}`}>
			<Logo width={150} height={'auto'} />
			<div className={`${classes.inputArea}`}>
				<Text noMargin size={'md'} spacing={'md'} primaryColor>
					Enter your reference ID
				</Text>
				<Form
					initialValues={{
						reference: '',
						remember: true,
					}}
					name='login'
					form={form}
					onFinish={onFinish}
				>
					<Form.Item name={'reference'}>
						<Input
							size={'large'}
							className={`${classes.inputField}`}
							placeholder={'REFERENCE ID'}
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

export default Reference;
