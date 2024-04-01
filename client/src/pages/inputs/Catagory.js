import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Table, Button, Modal, Form, Input } from 'antd';
import toast from 'react-hot-toast';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [updateCategoryId, setUpdateCategoryId] = useState(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get All Categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get('/api/user/stockManager/getAllCategory', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  
  // Create Category
  const handleFormSubmit = async (values) => {
    try {
      const res = await axios.post('/api/user/stockManager/createCategory', values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        toast.success('Category created successfully');
        setIsModalVisible(false);
        form.resetFields();
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create category');
    }
  };

  // Delete Category
  const deleteCategory = async (categoryId) => {
    try {
      const res = await axios.delete(`/api/user/stockManager/deleteCategory/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        toast.success('Category deleted successfully');
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete category');
    }
  };

  // update category
  const handleUpdateFormSubmit = async (values) => {
    try {
      const res = await axios.put(`/api/user/stockManager/updateCategory/${updateCategoryId}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        toast.success('Category updated successfully');
        setIsModalVisible(false);
        form.resetFields();
        setUpdateCategoryId(null);
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update category');
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
      title: 'Category ID',
      dataIndex: 'categoryId',
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="text-center m-2 mx-10">
          <button className="btn btn-danger mx-2" onClick={() => deleteCategory(record.categoryId)}>
            Delete
          </button>
          <button className="btn btn-danger mx-2" onClick={() => handleUpdateFormSubmit(record.categoryId)}>
            Update
          </button>
          {/* Add updateCategory functionality */}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">All Categories</h1>
      <Button type="primary" onClick={showModal}>
        + Create Category
      </Button>
      <Modal title="Create Category" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item name="categoryId" label="Category Id" rules={[{ required: true, message: 'Please enter the category Id' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Category Name" rules={[{ required: true, message: 'Please enter the category name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Amount" rules={[{ required: true, message: 'Please enter the amount' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price' }]}>
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
        <Table columns={columns} dataSource={categories} />
      </div>
    </Layout>
  );
};

export default Category;