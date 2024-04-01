import React from 'react';
import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const response = await axios.post('/api/user/register', values);

      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast('Redirect to login page');
        navigate('/login');
      } else {
        toast.error(response.data.message);
        form.resetFields(); // Clear the input values
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  const validateName = (_, value) => {
    if (!value) {
      return Promise.reject('Name is required');
    }
    return Promise.resolve();
  };

  const validateEmail = (_, value) => {
    if (!value) {
      return Promise.reject('Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return Promise.reject('Invalid email format');
    }

    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject('Password is required');
    }

    if (value.length < 4) {
      return Promise.reject('Password should be at least 4 characters');
    }

    return Promise.resolve();
  };

  return (
    <div className='authentication'>
      <div className='authentication-form card p-3 '>
        <h1 className='card-title'>Welcome to Our System</h1>
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label='Name' name='name' rules={[{ validator: validateName }]}>
            <Input placeholder='Name' />
          </Form.Item>

          <Form.Item label='Email' name='email' rules={[{ validator: validateEmail }]}>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item label='Password' name='password' rules={[{ validator: validatePassword }]}>
            <Input placeholder='Password' type='password' />
          </Form.Item>

          <button className='primary-button my-2' htmlType='submit'>
            REGISTER
          </button>
          <Link to='/login' className='anchor mt-2'>
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;