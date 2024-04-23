import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Input, Button, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import './BranchStaffLogin.css';

const BranchStaffLoginPage = ({ handleBranchStaffLogin }) => {
  const [branchName, setBranchName] = useState('');
  const [branchId, setBranchId] = useState('');
  const [branchSttafId, setBranchSttafId] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch branches data from the server
    axios.get('/api/branches')
      .then(response => {
        // setBranches(response.data); // Uncomment if you need to use branches
      })
      .catch(error => {
        console.error('Error fetching branches:', error);
      });

    // Fetch branch staff data from the server
    axios.get('/api/branch-staff')
      .then(response => {
        // setBranchStaff(response.data); // Uncomment if you need to use branchStaff
      })
      .catch(error => {
        console.error('Error fetching branch staff:', error);
      });
  }, []);

  const onFinish = (values) => {
    const { branchName, branchId,branchSttafId } = values;

    handleBranchStaffLogin(branchName, branchId,branchSttafId)
      .then(() => {
        message.success('Branch staff logged in successfully');
        // Perform any additional actions upon successful login
      })
      .catch((error) => {
        message.error(error.message || 'Error during branch staff login');
      });
  };

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='authentication-form card p-3'>
        <h1 className='head-card-title'>Branch Staff Login</h1>

        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item
            label='Branch Name'
            name='branchName'
            rules={[{ required: true, message: 'Branch Name is required' }]}
          >
            <Input
              placeholder='Branch Name'
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label='Branch ID'
            name='branchId'
            rules={[{ required: true, message: 'Branch ID is required' }]}
          >
            <Input
              placeholder='Branch ID'
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='BranchStaffId'
            name='SttafId'
            rules={[{ required: true, message: 'Branch Sttaf id is required' }]}
          >
            <Input
              placeholder='Branch sttaf Id'
              value={branchSttafId}
              onChange={(e) => setBranchSttafId(e.target.value)}
            />
          </Form.Item>

          <Button className='primary-button my-2 button-anchor' htmlType='submit'>
            Login
          </Button>
          <Link to='/register' className='anchor mt-2'>
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default BranchStaffLoginPage;