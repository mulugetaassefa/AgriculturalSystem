import React from 'react';
import { Button, Col, Form, Row, TimePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { showLoading, hideLoading } from '../redux/alertsSlice';

const ApplyInvestor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      console.log(values);
      const response = await axios.post('/api/user/apply-investor-account', { ...values, userId: user._id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast('Redirect to investors page');
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <div className='page-title'>Apply for Investor</div>
      <hr />
      <Form layout='vertical' onFinish={onFinish}>
        <h1 className='card-title mt-3'>Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="First Name" name='firstName' rules={[{ required: true }]}>
              <input placeholder='First Name' style={{ width: '70%' }} type="text" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Last Name" name='lastName' rules={[{ required: true }]}>
              <input placeholder='Last Name' style={{ width: '70%' }} type='text' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Phone Number" name='phoneNumber' rules={[{ required: true }]}>
              <input placeholder='Phone Number' style={{ width: '70%' }} type='text' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Address" name='address' rules={[{ required: true }]}>
              <input placeholder='Address' style={{ width: '70%' }} type='text' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="website" name='website' rules={[{ required: true }]}>
              <input placeholder='website' style={{ width: '70%' }} type='text' />
            </Form.Item>
          </Col>
        </Row>

        <hr />
        <h1 className='card-title mt-3'>Professional Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Specialization" name='specialization' rules={[{ required: true }]}>
              <input placeholder='Specialization' style={{ width: '70%' }} type='text' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Experience" name='experience' rules={[{ required: true }]}>
              <input placeholder='Experience' style={{ width: '70%' }} type='number' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Fee Per Consultation" name='feePerConsultation' rules={[{ required: true }]}>
              <input placeholder='Fee Per Consultation' style={{ width: '70%' }} type='number' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Timings" name='timings' rules={[{ required: true }]}>
              <TimePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>

        <div className='d-flex justify-content-end '>
          <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyInvestor;