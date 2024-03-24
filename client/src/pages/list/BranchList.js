import React, { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import axios from "axios"
import { Table } from "antd"

const BranchList = () => {
    const [branches, setBranches] = useState([])

    // getAllBranches
    const getAllBranches = async () => {
        try {
           const res =await axios.get('/api/user/admin/getAllBranches')
           if(res.data.success) {
             setBranches(res.data.data);
           }
          
        } catch (error) {
           console.log(error)
        }
    }
    useEffect(() => {
       getAllBranches()
    }, []);
    
  // antD table col
  const columns = [
    {
        title:'BranchId',
        dataIndex:'branchId',
    },
    {
        title:'Branch Name',
        dataIndex:'branchName',
    },
    {
        title:'Branch Location',
        dataIndex:'branchLocation',
    },
    {
        title:'Branch Staff',
        dataIndex:'branchStaff',
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
    <h1 className="text-center m-2">All Branches</h1>
    <Table  columns={columns}  dataSource={branches}/>
    </Layout>
  )
}

export default BranchList
