import React from 'react'
import {Input, Form, Button,Row, Col} from 'antd';
import Layout from '../../components/Layout';
import './DistributeInput.css';
const DistributeInput = () => {
const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
      };
  return (
    <Layout>
       <h1>Distribute Input</h1>
      <Form form={form} onFinish={onFinish}>
        <Row className="row-margin">
        <Col span={8} xs={24} sm={24} lg={8}> 
      <Form.Item 
        label="Distribution Id"
        name="distribution"
        rules={[
          {
            required: true,
            message: 'Please enter the distribution id.',
          },
        ]}
      >
        <Input placeholder="Enter distribution id" />
      </Form.Item>
       </Col>
       <Col span={8} xs={24} sm={24} lg={10}>
      <Form.Item
        label="Branch id"
        name="Branch id"
        rules={[
          {
            required: true,
            message: 'Please enter the distribution branch id.',
          },
        ]}
      >
        <Input placeholder="Enter distribution branch id" />
      </Form.Item>
      </Col>
      </Row>
      <Row>
      <Form.Item
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: 'Please enter the location of branch.',
          },
        ]}
      >
        <Input placeholder="Enter location of branch" />
      </Form.Item>
      <Form.Item
        label="Input Category"
        name="category"
        rules={[
          {
            required: true,
            message: 'Please enter the input category.',
          },
        ]}
      >
        <Input placeholder="Enter input category" />
      </Form.Item>
      </Row>
      <Form.Item
        label="Amout"
        name="amount"
        rules={[
          {
            required: true,
            message: 'Please enter the amount.',
          },
        ]}
      >
        <Input placeholder="Enter amount" />
      </Form.Item>

     <Row> 
      <Form.Item>
        <Button type="primary" htmlType="submit" className="mx-3">
          Submit
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={() =>form.resetFields()}>
         Cancel
        </Button>
      </Form.Item>
      </Row>
    </Form>
    </Layout>
  )
}

export default DistributeInput
