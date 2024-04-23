import React, { useEffect,useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Table, Button, Modal, Form, Input, Select } from "antd";
import Layout from '../../../components/Layout';
const { Option } = Select;

const FarmerList = () => {
const [farmer, setFarmer] = useState([]);
const [form] = Form.useForm();
const [isModalVisible, setIsModalVisible] = useState(false);
const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
const [upDateIntialValueData,  setUpdateFarmerData] = useState(null);


  // get all Branch staff
  const getAllFarmer = async () => {
    try { 
      const res = await axios.get("/api/user/branchSttaf/getAllFarmer");
      if (res.data.success) {
        setFarmer(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    getAllFarmer();
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
      const res = await axios.post("/api/user/branchSttaf/create-farmer", values);
      console.log(res);
      if (res.data.success) {
        toast.success("farmer created successfully");
        getAllFarmer();
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
    const res = await axios.put(`/api/user/branchStaff/branch-update/${inputId}`, values);
    if (res.data.success) {
      toast.success('Input updated successfully');
      getAllFarmer();
      setIsUpdateFormVisible(false);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error('Error occurred while on updating input data');
  }  
   }


// delete farmer by id
   const deleteFarmer = async (_id) => {
    try {
      const response = await axios.delete(`/api/user/branchSttaf/delete-farmer/${_id}`);
  
      if (response.status === 200 && response.data.success) {
        // Deletion was successful
        toast.success(response.data.message);
        console.log(response.data.message);
        getAllFarmer();
      } else {
        // Handle error response
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


  // update branchstaff
const updatePrevFarmerInfo= async (id) => {
    try {
      const res = await axios.get(`/api/user/admin/branchStaff/${id}`);
      console.log(res);
      if (res.data.success) {
        const inputData = res.data.data;
        setUpdateFarmerData(inputData); // Set the input data to be updated
        setIsUpdateFormVisible(true); // Show the update form
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error occurred while retrieving branch data');
    }
  }

// 
const columns = [
  {
    title: "userId",
    dataIndex: "userId"
  },
  {
    title: "Farmer Name",
    dataIndex: "fullName",
    render: (text, record) => `${record.firstName} ${record.lastName}`,
  },
  {
    title: "PhoneNumber",
    dataIndex: "phoneNumber",
  },
  {
    title: "BranchId",
    dataIndex: "branchId",
  },
  {
    title: "RegistrationDate",
    dataIndex: "date",
  },
  {
    title: "farmer Location",
    dataIndex: "address",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Farm Size",
    dataIndex: "farmSize",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="text-center d-flex m-2">
  <button className="btn btn-danger mx-2"  onClick={() => deleteFarmer(record._id)}> Delete</button>
        <button className="btn btn-danger"
             onClick={() => { 
              setIsUpdateFormVisible(true);
              updatePrevFarmerInfo(record.userId);
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
       <h1 className="text-center m-2">All farmer in branch</h1>
      <Button type="primary" onClick={showModal} >
        + Create new farmer
      </Button>


<Modal title="Create farmer"  visible={isModalVisible} onCancel={handleCancel} footer={null}>
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
  <Form.Item name="branchId" label="Branch ID" rules={[{ required: true, message: "Please enter the Branch ID" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="status" label="status" rules={[{ required: true, message: "Please enter date of registeration" }]}>
  <Select>
      <Option value="pending">Pending</Option>
      <Option value="active">Active</Option>
      <Option value="inactive">Inactive</Option>
    </Select>
    </Form.Item>
  <Form.Item name="farmSize" label="Farm size" rules={[{ required: true, message: "Please enter the farm size" }]}>
    <Input />
  </Form.Item>
  <Form.Item name=" date" label="Date" rules={[{ required: true, message: "Please enter date of registeration" }]}>
    <Input type='date' />
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
              onFinish={(values) => handleUpdateFormSubmit(updatePrevFarmerInfo.inputId, values)}
              >
                <Form.Item name="userId" label="User ID" rules={[{ required: true, message: "Please enter the User ID" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "Please enter the First Name" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Please enter the Last Name" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="phoneNumbe" label="Phone Number" rules={[{ required: true, message: "Please enter the Phone Number" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please enter the Address" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="branchId" label="Branch ID" rules={[{ required: true, message: "Please enter the Branch ID" }]}>
    <Input />
  </Form.Item>
  <Form.Item name="status" label="status" rules={[{ required: true, message: "Please enter date of registeration" }]}>
  <Select>
      <Option value="pending">Pending</Option>
      <Option value="active">Active</Option>
      <Option value="inactive">Inactive</Option>
    </Select>
    </Form.Item>
  <Form.Item name="farmSize" label="Farm size" rules={[{ required: true, message: "Please enter the farm size" }]}>
    <Input />
  </Form.Item>
  <Form.Item name=" date" label="Date" rules={[{ required: true, message: "Please enter date of registeration" }]}>
    <Input type='date' />

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
      <div style={{ maxHeight: "400px",  maxWidth: "1400px",  overflow: "auto" }}> 
       <Table columns={columns} dataSource={farmer} />
 </div>
    </Layout>
  )
}

export default FarmerList;
