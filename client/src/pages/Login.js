import React from 'react'
 import {Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from 'axios';
 import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertsSlice';
 
const Login = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
 
  const onFinish = async(values) => {
    try {
       dispatch(showLoading());
      const response =await axios.post('/api/user/login', values);
       dispatch(hideLoading());
      if(response.data.success) {
        toast.success(response.data.message);
        toast('Redirecting to home page');
        const token = response.data.token;
       localStorage.setItem("token", token);
        navigate("/");
        console.log(localStorage.getItem('token'));
        
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      dispatch(hideLoading());
      toast.error('something went wrong');
    }
  }
  return (
    <div className='authentication'>
       <div className='authentication-form card p-3 '>
        <h1 className='card-title'>Wellcome Back</h1>
       
        <Form layout='vertical' onFinish={onFinish}>

         <Form.Item label="Email" name='email'>
         <Input placeholder='Email'/>
         </Form.Item>

        <Form.Item label="Password" name='password'>
        <Input placeholder='Password' type='password'/>
        </Form.Item>

        <button className='primary-button my-2 ' htmltype='submit'  >
           Login
          </button >
        <Link  to="/register" className='anchor mt-2'>CLICK HERE TO REGISTER </Link>

     </Form>
       </div>
    </div>
  )
}

export default Login;
