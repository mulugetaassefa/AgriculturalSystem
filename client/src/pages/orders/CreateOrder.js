import React,{useEffect, useState }  from 'react'
import Layout from '../../components/Layout';
import axios from "axios"
import { Table } from "antd"


const CreateOrder = () => {
  const [orders, setOrders] = useState([])

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

// accepted orders
const acceptOrderHandler =() => {
   console.log('order is accepted')
}

///  reject orders

const rejectOrderHandler =() => {
   console.log('order is rejected')
}

  // antD table col
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
          <button className='btn btn-danger mx-2' onClick={() => acceptOrderHandler()}>Accept</button>
          <button className='btn btn-danger' onClick={() => rejectOrderHandler()}>Reject</button>
        </div>
      )
    },
  ];
  return (
    <Layout>
        <Table  columns={columns} dataSource={orders} />
    </Layout>
  );
}

export default CreateOrder;
