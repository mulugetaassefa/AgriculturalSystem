import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Table, Button, Modal, Form, Input, Select } from "antd";
const { Option } = Select;

const BranchStaffList = () => {

const [branchStaffs, setBranchStaff] = useState([]);
const [form] = Form.useForm();
const [isModalVisible, setIsModalVisible] = useState(false);
const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
const [upDateIntialValueData,  setUpdateBranchData] = useState(null);

   
    // get all Branch staff
    const getAllBranchStaff = async () => {
        try { 
          const res = await axios.get("/api/user/admin/getAllBranchStaff");
          if (res.data.success) {
            setBranchStaff(res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=> {
        getAllBranchStaff();
      },[])

      const showModal =() => {
        setIsModalVisible(true); 
      }
      const handleCancel=() => {
        setIsModalVisible(false);
      }

      // submit the form that create new branch Staff
      const handleFormSubmit = async (values) => {
        try {
          const res = await axios.post("/api/user/branchSttaf/create-branchStaff", values);
          if (res.data.success) {
            toast.success("farmer created successfully");
            getAllBranchStaff();
            form.resetFields();
            setIsModalVisible(false);
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
        } 
      }


    const  handleUpdateFormSubmit = async (inputId,values) => {
      try {
        const res = await axios.put(`/api/user/admin/branch-update/${inputId}`, values);
        if (res.data.success) {
          toast.success('Input updated successfully');
          getAllBranchStaff();
          setIsUpdateFormVisible(false);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Error occurred while updating input data');
      }  
       }
 

      const  deleteBranchStaff = async (_id) => {
        try {
          const response = await axios.delete(`/api/user/admin/delete-branchStaff/${_id}`);
          console.log(response);
          if (response.status === 200 && response.data.success) {
            // Deletion was successful
            toast.success("Branch staff deleted successfully");
            console.log(response.data.message);
            getAllBranchStaff();
          } else {
            // Handle error response
            console.log(response.data.message);
          }
        } catch (error) {
          console.error(error);
        }
      }


      // update branchstaff
    const updatePrevBranch= async (id) => {
        try {
          const res = await axios.get(`/api/user/admin/branchStaff/${id}`);
          console.log(res);
          if (res.data.success) {
            const inputData = res.data.data;
            setUpdateBranchData(inputData); // Set the input data to be updated
            setIsUpdateFormVisible(true); // Show the update form
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error('Error occurred while retrieving branch data');
        }
      }


     // antD table columns

    const columns = [
      {
        title: "Branch Staff",
        dataIndex: "fullName",
        render: (text, record) => `${record.firstName} ${record.lastName}`,
      },
      {
        title: "BranchId",
        dataIndex: "branchId",
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
      },
      {
        title: "Branch Name",
        dataIndex: "branchName",
      },
      {
        title: "Branch Location",
        dataIndex: "address",
      },
      {
        title: "Status",
        dataIndex: "status",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (_, record) => (
          <div className="text-center m-2">
      <button className="btn btn-danger mx-2" onClick={() => deleteBranchStaff(record._id)}> Delete</button>
            <button className="btn btn-danger"
                 onClick={() => {
                setIsUpdateFormVisible(true);
                updatePrevBranch(record.userId);
              }}
            >
              Update
            </button>
            <button className="btn btn-danger mx-2">View</button>
          </div>
        ),
      },
    ];
   
  return (
    <Layout>
       <h1 className="text-center m-2">All BranchStaff</h1>
      <Button type="primary" onClick={showModal} >
        + Create new BranchStaff
      </Button>
      <Modal title="Create Branch"  visible={isModalVisible} onCancel={handleCancel} footer={null}>
     <Form form={form} onFinish={handleFormSubmit} >
  <Form.Item name="userId" label="User ID" rules={[{ required: true, message: "Please enter the User ID" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "Please enter the First Name" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Please enter the Last Name" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: "Please enter the Phone Number" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please enter the Address" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the Status" }]}>
    <Select>
      <Option value="pending">Pending</Option>
      <Option value="inactive">Inactive</Option>
    </Select>
  </Form.Item>
  <Form.Item name="branchId" label="Branch ID" rules={[{ message: "Please enter the Branch ID" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="branchName" label="Branch Name" rules={[{message: "Please enter the Branch Name" }]}>
    <Input />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit" className="mx-2">
      Create
    </Button>
    <Button type="primary" onClick={() => form.resetFields()}>
      Cancel
    </Button>
  </Form.Item>
      </Form>
      </Modal> 
      {
        isUpdateFormVisible && upDateIntialValueData && (
            <Modal
            title="UpdateInput"
            visible={isUpdateFormVisible}
            onCancel={() => setIsUpdateFormVisible(false)}
            footer={null}
          >
              <Form
              form={form}
              initialValues={upDateIntialValueData}
              onFinish={(values) => handleUpdateFormSubmit(updatePrevBranch.inputId, values)}
              >
         <Form.Item name="branchName" label="Branch Name" rules={[{ required: true, message: "Please enter the branch name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="branchId" label="Branch ID" rules={[{ required: true, message: "Please enter the branch ID" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="branchLocation" label="Location" rules={[{ required: true, message: "Please enter the location" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="branchstaff" label="Branch Staff" rules={[{ required: true, message: "Please enter the branch staff" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the status" }]}>
            <Select>
              <Option value="active">Active</Option>
              <Option value="passive">Passive</Option>
            </Select>
          </Form.Item>
            
                <Form.Item>
                      <Button type="primary" htmlType="submit" className='mx-2' >
                          update  
                      </Button>
                      <Button type="primary" onClick={() => { form.resetFields();  }} >
                      Cancel
                      </Button>
                </Form.Item>
              </Form>  
          </Modal>
        )
      }
  <div style={{ maxHeight: "400px", overflowY: "scroll" }}> 
      <Table columns={columns} dataSource={branchStaffs} />
 </div>
    </Layout>
  )
}

export default BranchStaffList;
