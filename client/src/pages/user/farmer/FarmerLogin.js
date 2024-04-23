import React from 'react';
import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { showLoading, hideLoading } from '../../../redux/alertsSlice';
import axios from 'axios';
import './FarmerLogin.css'; // Import the CSS file
import Layout from '../../../components/Layout';

const FarmerLogin = () => {

  const [form] = Form.useForm();
  const dispatch =useDispatch();
  const navigate =useNavigate();
 
  const onFinish = async (values) => {
    try {
    // dispatch(showLoading());

    //  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //  if (!emailRegex.test(values.email)) {
    //  dispatch(hideLoading());
    //    toast.error('Invalid email format');
    //   form.resetFields();
    //    return;
    //  } // if
     navigate('/FarmerHome');
     dispatch(hideLoading());
     const response = await axios.post('/api/user/investorLogin', values);
     dispatch(hideLoading());
     if (response.data.success) {
       toast.success(response.data.message);
       toast('Redirecting to home page');
       const token = response.data.token;
       localStorage.setItem('token', token);
       navigate('/investorHome');
       console.log(localStorage.getItem('token'));
     } else {
       toast.error(response.data.message);
       form.resetFields(); // Clear the input values
     }
     
    } catch (error) {
     dispatch(hideLoading());
     toast.error('Something went wrong');
    }
   } 

  return (
    <Layout>
           <h1 className='head-title'>Login as Farmer with in Branch</h1>
      <Form form={form} layout='vertical' className='login-form' onFinish={onFinish}>
        <Form.Item label='Email/phone' name='email/phone' rules={[{ required: true, message: 'Email is required' }]}>
          <Input placeholder='Enter Email or phone' />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input placeholder='Password' type='password' />
        </Form.Item>
        <Form.Item label='Branch Name' name='branchName' rules={[{ required: true, message: 'branch id is  required' }]}>
          <Input placeholder='Branch name' />
        </Form.Item>
        <Form.Item label='Branch Id' name='branchId' rules={[{ required: true, message: 'branch name is  required' }]}>
          <Input placeholder='Branch name' />
        </Form.Item>
        <button className='primary-button my-2' htmlType='submit'>
          Login
        </button>
        <Link to='/register' className='anchor mt-2'>
          CLICK HERE TO logout
        </Link>
      </Form>
    </Layout>
  );
}

export default FarmerLogin;