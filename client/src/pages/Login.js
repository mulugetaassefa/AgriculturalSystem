import React from 'react';
import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        dispatch(hideLoading());
        toast.error('Invalid email format');
        form.resetFields();
        return;
      }

      const response = await axios.post('/api/user/login', values);
      dispatch(hideLoading());
      
      if (response.data.success) {
        toast.success(response.data.message);
        toast('Redirecting to home page');
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/');
        console.log(localStorage.getItem('token'));
      } else {
        toast.error(response.data.message);
        form.resetFields(); // Clear the input values
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='authentication'>
      <div className='authentication-form card p-3 '>
        <h1 className='card-title'>Welcome Back</h1>

        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Email is required' }]}>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input placeholder='Password' type='password' />
          </Form.Item>

          <button className='primary-button my-2' htmlType='submit'>
            Login
          </button>
          <Link to='/register' className='anchor mt-2'>
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;