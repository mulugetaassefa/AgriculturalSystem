import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [upDateIntialValueData,  setUpdateBranchData] = useState(null);
  const [form] = Form.useForm();

  // getAllBranches
  const getAllBranches = async () => {
    try {
      const res = await axios.get("/api/user/admin/getAllBranches");
      if (res.data.success) {
        setBranches(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBranches();
  }, []);

  // create branch
  const handleFormSubmit = async (values) => {
    try {
      console.log(values);
      const res = await axios.post("/api/user/admin/create-branch", values);
      if (res.data.success) {
        toast.success("Branch created successfully");
        getAllBranches();
        form.resetFields();
        setIsModalVisible(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete branch by id
  const deleteBranch = async (_id) => {
    try {
      const response = await axios.delete(`/api/user/admin/delete-branch/${_id}`);
      console.log(response);
      if (response.status === 200 && response.data.success) {
        // Deletion was successful
        toast.success("Branch deleted successfully");
        console.log(response.data.message);
        getAllBranches();
      } else {
        // Handle error response
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // show previous value of selected branch
 const  updatePrevBranch= async (id) => {
    try {
      const res = await axios.get(`/api/user/admin/branch/${id}`);
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
  };

 // handle submit update form data 
 const handleUpdateFormSubmit = async (inputId, values) => {
    try {
      const res = await axios.put(`/api/user/admin/branch-update/${inputId}`, values);
      if (res.data.success) {
        toast.success('Input updated successfully');
        getAllBranches();
        setIsUpdateFormVisible(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error occurred while updating input data');
    }
  };
  // create popup menu to create branch
  const showModal = () => {
    setIsModalVisible(true);
  };

  // cancel create branch popup menu
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // antD table columns
  const columns = [
    {
      title: "BranchId",
      dataIndex: "branchId",
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
    },
    {
      title: "Branch Location",
      dataIndex: "branchLocation",
    },
    {
      title: "Branch Staff",
      dataIndex: "branchStaff",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="text-center m-2">
          <button className="btn btn-danger mx-2" onClick={() => deleteBranch(record._id)}>
            Delete
          </button>
          <button className="btn btn-danger" onClick={() => {
       setIsUpdateFormVisible(true);
        updatePrevBranch(record._id); }}
           >Update</button>
          <button className="btn btn-danger mx-2">View</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">All Branches</h1>
      <Button type="primary" onClick={showModal}>
        + Create Branch
      </Button>
      <Modal title="Create Branch" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item name="branchName" label="Branch Name" rules={[{ required: true, message: "Please enter the branch name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="branchId" label="Branch ID" rules={[{ required: true, message: "Please enter the branch ID" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="branchLocation" label="Location" rules={[{ required: true, message: "Please enter the location" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="branchStaff" label="Branch Staff" rules={[{ required: true, message: "Please enter the branch staff" }]}>
          <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the status" }]}>
            <Select>
              <Option value="active">Active</Option>
              <Option value="passive">Passive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mx-2">
              Create
            </Button>
            <Button type="primary" onClick={() => form.resetFields()}>
              Cancel </Button>
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
        <Table columns={columns} dataSource={branches} />
      </div>
    </Layout>
  );
};

export default BranchList;