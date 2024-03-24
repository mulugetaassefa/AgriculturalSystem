import React, { useEffect, useState }from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

const CreateInput = () => {
    const [inputs, setInputs] =useState([])
     // getAllBranches
     const getAllInputs = async () => {
        try {
           const res =await axios.get('/api/user/stockManager/getAllInputs',
            
           {
            headers : {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
         });
         if(res.data.success) {
             setInputs(res.data.data);
           }
          
        } catch (error) {
           console.log(error)
        }
    }
    useEffect(() => {
       getAllInputs()
    }, []);

    // antD table col
  const columns = [
    {
        title:'inputId',
        dataIndex:'inputId',
    },
    {
        title:'Input Name',
        dataIndex:'name',
    },
    {
        title:'Category',
        dataIndex:'category',
    },
    {
        title:'Amount',
        dataIndex:'quantity',
    },
    {
        title:'Price',
        dataIndex:'price',
    },
    {
        title:'Actions',
        dataIndex:'actions',
        render: (text, record) => (
            <div className="text-center m-2">
                <button className='btn btn-danger mx-2'>Delete</button>
                <button className='btn btn-danger'>Update</button>
            </div>
        )
    },
]

  return (
    <Layout>
        <h1 className='text-center m-2'>All Inputs</h1>
        <Table  columns={columns} dataSource={inputs}/>
    </Layout>
  )
}

export default CreateInput
