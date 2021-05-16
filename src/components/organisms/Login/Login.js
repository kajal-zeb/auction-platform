import { Input, Form, Button } from 'antd';
import React from 'react';
import Sprite from '../../atoms/Sprite/Sprite';
import classes from './Login.module.scss';

const Login = () => {
  const [form] = Form.useForm();
  const onFinish = (data) => {
    console.log(data);
  };

  return (
    <div className={`${classes.loginView}`}>
      <Sprite id='bitcoin' width={70} height={70} />
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
