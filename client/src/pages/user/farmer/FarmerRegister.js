import React from 'react'
import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const FarmerRegister = () => {
  return (
    <div>
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
  )
}

export default FarmerRegister
