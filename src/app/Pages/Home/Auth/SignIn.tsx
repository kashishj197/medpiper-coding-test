import React from 'react';
import './SignIn.css';
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ISignIn, { ISignInForm } from '../../../Interfaces/SignIn';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { INotification } from '../../../Interfaces/Notifications';

const SignIn: React.FunctionComponent<ISignIn> = props => {
  const navigate = useNavigate();
  const onFinish = (values: ISignInForm) => {
    console.log('Received values of form: ', values);
    props.setLoggedIn && props.setLoggedIn(true);
    const successContent: INotification = { title: "Log In", text: "You are now logged in", icon: "success" };
    swal(successContent);
    setTimeout(() => {
      navigate('../dashboard');
    }, 500);
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
          rules={[{ required: true, message: 'Please input your Password!' },
          {min: 7, message: 'Minimum length should be 7'}]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
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
            Log in
          </Button>
          Or <span className="link" onClick={(() => props.setSignIn(false))}>Sign Up now!</span>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignIn;