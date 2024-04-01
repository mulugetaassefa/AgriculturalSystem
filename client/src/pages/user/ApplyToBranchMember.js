import React from 'react'
import { Button, Col, Form, Row, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Layout from '../../components/Layout';

 const { Option } = Select;

const ApplyToBranchMember = () => {
  return (
    <Layout>
      <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
    <div className='page-title'>Apply for Farmer to Member of Branch</div>
    <hr />
    <Form layout='vertical' >
      <h1 className='card-title mt-3'>Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Full Name" name='fullName' rules={[{ required: true }]}>
            <input placeholder='First Name' style={{ width: '70%' }} type="text" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Email" name='email' rules={[{ required: true }]}>
            <input placeholder='Last Name' style={{ width: '70%' }} type='text' />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your gender' }]}>
        <Select>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: 'Please enter your date of birth' }]}>
        <input type="date" />
      </Form.Item>
     </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Form.Item label="Upload Document" name="document">
        <Upload
          name="document"
          accept=".pdf,.doc,.docx"
         // onChange={onFileChange}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
         </Col>
         <Col span={8} xs={24} sm={24} lg={8}>
         <Form.Item label="Upload Image" name="image">
        <Upload
          name="image"
          accept="image/*"
        //  onChange={onFileChange}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
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
        <Form.Item label="Farm Location" name="farmLocation" rules={[{ required: true, message: 'Please enter your farm location' }]}>
        <input />
      </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Form.Item label="Membership of Branch" name="membershipTypeBranch" rules={[{ required: true, message: 'Please select your membership type branch' }]}>
        <Select>
          <Option value="regular">branch1</Option>
          <Option value="associate">branch2</Option>
        </Select>
      </Form.Item>
        </Col>
      </Row>

      <hr />
      <h1 className='card-title mt-3'>Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Form.Item label="Type of Farming" name="farmingType" rules={[{ required: true, message: 'Please enter your type of farming' }]}>
        <input />
      </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Form.Item label="Farm Size" name="farmSize" rules={[{ required: true, message: 'Please enter your farm size' }]}>
        <input />
      </Form.Item>
        </Col>
       
      </Row>

      <div className='d-flex justify-content-end '>
        <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
      </div>
    </Form>
    </div>
  </Layout>
  )
}

export default ApplyToBranchMember;


