import React, {useEffect, useState } from 'react'
import UserLayout from '../UserLayout'
import axios from "axios";
import toast from 'react-hot-toast';
import { Table,Button, Modal, Form, Input, Select } from 'antd'
const { Option } = Select;
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [upDateIntialValueData, setUpdateInputData] = useState(null);
   
  // getAllOrders
  const getAllOrders = async () => {
    try {
       const res =await axios.get('/api/user/stockManager/getAllOrders')
       if(res.data.success) {
         setOrders(res.data.data);
       }
      
    } catch (error) {
       console.log(error)
    }
}
useEffect(() => {
   getAllOrders()
}, []);
  const columns = [
    {
      title: 'OrderId',
      dataIndex: 'orderId',
    },
    {
      title: 'customerId',
      dataIndex: 'customerId',
    },
    {
      title: 'InputName',
      dataIndex: 'products',
      render: (text, record) => record.products.map((product) => product.name).join(', '),
    },
    {
      title: 'Catagory',
      dataIndex: 'products',
      render: (text, record) => record.products.map((product) => product.category).join(', '),
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Unit Price',
      dataIndex: 'products',
      render: (text, record) => record.products.map((product) => product.price).join(', '),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="text-center m-2">
          <button className='btn btn-danger mx-2' >Update</button>
          <button className='btn btn-danger' >Delete</button>
        </div>
      )
    },
  ];

    //  create new inputs
    const handleFormSubmit = async (values) => {
      try { 
          console.log(values)
        const res = await axios.post('/api/user/stockManager/createInput', values);
        if (res.data.success) {
          toast.success('input created successfully');
          getAllOrders();
          form.resetFields();
          setIsModalVisible(false);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <UserLayout>
       <h1 className='text-center m-2'>All Orders</h1> 
      <Button type="primary" onClick={showModal}> + Create Input  </Button>
   <Modal title="Create Input" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleFormSubmit }>
        <Form.Item name="inputId" label="InputId" rules={[{ required: true, message: 'Please enter the input Id' }]}>
            <Input />
      </Form.Item>
      <Form.Item name="name" label="Input Name" rules={[{ required: true, message: 'Please enter the input name' }]}>
         <Input />
        </Form.Item>
      <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category' }]}>
          <Select>
            <Option value="Chemicals">Chemicals</Option>
             <Option value="seeds">Seeds</Option>
             <Option value="fertilizers">Fertilizers</Option>
            <Option value="farm Tools">Farm Tools</Option>
          </Select>
     </Form.Item>
    <Form.Item name="manufacturer" label="Manufacturer" rules={[{ required: true, message: 'Please enter the manufacturer org..' }]}>
            <Input />
    </Form.Item>
    <Form.Item name="price" label="Unit Price" rules={[{ required: true, message: 'Please enter the price of input' }]}>
         <Input />
    </Form.Item>
  <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity of input' }]}>
       <Input />
    </Form.Item>
     <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true, message: 'Please enter the expiry date' }]}>
      <Input />
      </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='mx-2' >
              Create
            </Button>
            <Button type="primary" onClick={() => { form.resetFields();  }} >
             Cancel
            </Button>
          </Form.Item>
        </Form>
   </Modal>
       <Table  columns={columns} dataSource={orders} />
    </UserLayout>
  )
}

export default Order;
