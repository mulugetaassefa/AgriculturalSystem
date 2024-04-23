import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Form, Row, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout';
import { showLoading, hideLoading } from '../../redux/alertsSlice';


const AddBranch = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
 
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      console.log(values);
      const response = await axios.post('/api/user/admin/create-branch', { ...values, userId: user._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast('Redirect to investors page');
        navigate("/addBranch");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong on server');
    }
  };

    return (
      <Layout>
        <div className='page-title'>Add new Branch</div>
        <hr />
        <Form layout='vertical' onFinish={onFinish}>
          <h1 className='card-title mt-3'>Branch Information</h1>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item required label="Branch Name"  name="branchName" rules={[{ required: true }]}>
                <Input placeholder='branchName' style={{ width: '70%' }} type="text" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item required label="Branch Id" name="branchId" rules={[{ required: true }]}>
                <Input placeholder='branch id' style={{ width: '70%' }} type='text' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item required label="Branch Location" name='branchLocation' rules={[{ required: true }]}>
                <Input placeholder='branch Location' style={{ width: '70%' }} type='text' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item required label="Branch Status " name='branchStatus ' rules={[{ required: true }]}>
                <Input placeholder='Branch Status ' style={{ width: '70%' }} type='text' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item required label="Branch Staff" name='branchStaff' rules={[{ required: true }]}>
                <Input placeholder=' Branch Staff' style={{ width: '70%' }} type='text' />
              </Form.Item>
            </Col>
          
          </Row>
  
          <hr />
  
          <div className='d-flex justify-content-end '>
            <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
          </div>
        </Form>
      </Layout>
    );
  
};

export default AddBranch;








