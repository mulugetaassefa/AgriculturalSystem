
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Table, message } from 'antd';


const InvestorList = () => {
 const [investors, setInvestors] = useState([])
 // getInvestors
 const getInvestors = async () => {
     try {
        const res =await axios.get('/api/user/admin/getAllInvestors')
        if(res.data.success) {
          setInvestors(res.data.data);
        }
       
     } catch (error) {
        console.log(error)
     }
 }

 // handle account change
 const handleAccountStatus = async (record, status) => {
    try {
        const res =await axios.post('/api/user/admin/changeAccountStatus',
        {investorId: record._id, userId:record.userId, status:status},
         {
            headers : {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }
        );
        if(res.data.success) {
            message.success(res.data.message);
            window.location.reload();
        }
    } catch (error) {
         message.error("Something went wrong");
    }
 };

 useEffect(() => {
    getInvestors()
 } , []);

   // antD table col
    const columns = [
        {
            title:' firstName',
            dataIndex:'firstName',
        },
        {
            title:' lastName',
            dataIndex:'lastName',
        },
        {
            title:'phoneNumber',
            dataIndex:'phoneNumber',
        },
        {
            title:'Status',
            dataIndex:'status',
        },
        {
            title:'Actions',
            dataIndex:'actions',
            render: (text, record) => (
                <div className="d-flex">
                    {
                       record.status ==="pending" ? (
                        <button className='btn btn-success' onClick={() => handleAccountStatus(record, "approved")}>Approve</button>
                       ) : (
                        <button className='btn btn-danger'>Reject</button>
                       )
                    }
                </div>
            )
        },
    ]
  return (
    <Layout>
        <h1 className='d-flex items-align-center '>Investor List</h1>
     <Table  columns={columns}  dataSource={investors}/>
    </Layout>
  );
};

export default InvestorList;
