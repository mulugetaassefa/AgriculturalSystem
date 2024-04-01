import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Table, Button, Modal, Form, Input } from 'antd';
import toast from 'react-hot-toast';

const FarmUnionLeader = () => {
  const [farmUnionLeaders, setFarmUnionLeaders] = useState([]);
  const [updateLeaderId, setUpdateLeaderId] = useState(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get All Farm Union Leaders
  const getAllFarmUnionLeaders = async () => {
    try {
      const res = await axios.get('/api/user/stockManager/getAllFarmUnionLeaders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setFarmUnionLeaders(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFarmUnionLeaders();
  }, []);

  // Create Farm Union Leader
  const handleFormSubmit = async (values) => {
    try {
      const res = await axios.post('/api/user/stockManager/createFarmUnionLeader', values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        toast.success('Farm Union Leader created successfully');
        setIsModalVisible(false);
        form.resetFields();
        getAllFarmUnionLeaders();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create Farm Union Leader');
    }
  };

  // Delete Farm Union Leader
  const deleteFarmUnionLeader = async (leaderId) => {
    try {
      const res = await axios.delete(`/api/user/stockManager/deleteFarmUnionLeader/${leaderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        toast.success('Farm Union Leader deleted successfully');
        getAllFarmUnionLeaders();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete Farm Union Leader');
    }
  };

  // Update Farm Union Leader
  const handleUpdateFormSubmit = async (values) => {
    try {
      const res = await axios.put(`/api/user/stockManager/updateFarmUnionLeader/${updateLeaderId}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        toast.success('Farm Union Leader updated successfully');
        setIsModalVisible(false);
        form.resetFields();
        setUpdateLeaderId(null);
        getAllFarmUnionLeaders();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update Farm Union Leader');
    }
  };

  // Modal handlers
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Leader ID',
      dataIndex: 'leaderId',
    },
    {
      title: 'Leader Name',
      dataIndex: 'name',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="text-center m-2 mx-10">
          <button className="btn btn-danger mx-2" onClick={() => deleteFarmUnionLeader(record.leaderId)}>
            Delete
          </button>
          <button className="btn btn-danger mx-2" onClick={() => handleUpdateFormSubmit(record.leaderId)}>
            Update
          </button>
          {/* Add updateFarmUnionLeader functionality */}
        </div>
      ),
    },
  ];

  return (
    <Layout>
    <h1 className="text-center m-2">All Farm Union Leaders</h1>
    <Button type="primary" onClick={showModal}>
      + Create Farm Union Leader
    </Button>
    <Modal title="Create Farm Union Leader" visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item name="name" label="Leader Name" rules={[{ required: true, message: 'Please enter the leader name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="contact" label="Contact" rules={[{ required: true, message: 'Please enter the contact' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter the address' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mx-2">
            Create
          </Button>
          <Button type="primary" onClick={() => { form.resetFields(); }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      <Table columns={columns} dataSource={farmUnionLeaders} />
    </div>
  </Layout>
  );
};

export default FarmUnionLeader;