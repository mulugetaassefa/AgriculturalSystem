import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import Layout from '../../components/Layout';
const { Item } = Form;

const Contact = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
    // Handle form submission
    // ...
  };

  return (
    <Layout>
      <Form onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Please enter your full name' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[{ required: true, message: 'Please enter your date of birth' }]}
            >
              <Input type="date" />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please enter your gender' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email address' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Farm Name"
              name="farmName"
              rules={[{ required: true, message: 'Please enter your farm name' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Farm Location"
              name="farmLocation"
              rules={[{ required: true, message: 'Please enter your farm location' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Farm Size"
              name="farmSize"
              rules={[{ required: true, message: 'Please enter your farm size' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Type of Farming"
              name="farmingType"
              rules={[{ required: true, message: 'Please enter the type of farming' }]}
            >
              <Input />
            </Item>
          </Col>
        </Row>
        <Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Item>
      </Form>
    </Layout>
  );
};

export default Contact;