import React from 'react';
import './SignIn.css';
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ISignIn from '../../../Interfaces/SignIn';

const SignUp: React.FunctionComponent<ISignIn> = props => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className='signin'>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <span className="login-form-forgot link">
            Forgot password
          </span>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Create Account
          </Button>
          Or <span className="link" onClick={() => props.setSignIn(true)}>Sign In now!</span>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp;