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
import { INotification } from '../../../Interfaces/Notifications';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FunctionComponent<ISignIn> = props => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    if (validatePass(values)) {
      const success: INotification = { title: "Sign Up", text: "Successfully Signed Up", icon: "success" };
      swal(success);
      props.setLoggedIn && props.setLoggedIn(true);
      setTimeout(() => {
        navigate('../dashboard');
      }, 500);
    } else {
      const error: INotification = {
        title: "Error",
        text: "Password and Confirm password are not same",
        icon: "error"
      };
      swal(error);
    }
  };
  const validatePass = (values: any) => {
    if (values.password === values.confirmPassword) return true;

    return false;
  }
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
          { min: 7, message: 'Minimum length should be 7' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' },
          { min: 7, message: 'Minimum length should be 7' }]}
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