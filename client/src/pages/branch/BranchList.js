import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const BranchList = () => {
  const [branches, setBranches] = useState([]);
 const [branchStaffs, setBranchStaff] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updatePrevBranchData, setUpdateBranchData] = useState(null);
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


  useEffect(() => {
    getAllBranches();
    getAllBranchStaff();
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
  const updatePrevBranch = async (id) => {
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
      toast.error("Error occurred on retrieving branch data");
    }
  };

  // handle submit update form data
  const handleUpdateFormSubmit = async (_inputId, values) => {
    try {
      const res = await axios.put(`/api/user/admin/branch-update/${_inputId}`, values);
      if (res.data.success) {
        toast.success("Input updated successfully");
        getAllBranches();
        setIsUpdateFormVisible(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while updating input data");
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
      render: (_, record) => (
        <div>
          <Button className="btn btn-danger mx-2" onClick={() => updatePrevBranch(record._id)}>Update</Button>
          <Button className="btn btn-danger mx-2"
          onClick={() => deleteBranch(record._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <Button type="primary" onClick={showModal}>
        Create Branch
      </Button>
      <Table dataSource={branches} columns={columns} />

      <Modal
        title="Create Branch"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleFormSubmit} form={form}>
          <Form.Item
            name="branchId"
            label="BranchId"
            rules={[
              {
                required: true,
                message: "Please enter the branch ID!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="branchName"
            label="Branch Name"
            rules={[
              {
                required: true,
                message: "Please enter the branch name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="branchLocation"
            label="Branch Location"
            rules={[
              {
                required: true,
                message: "Please enter the branch location!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="branchStaff"
            label="Branch Staff name"
            rules={[
              {
                required: true,
                message: "Please select the branch staff!",
              },
            ]}
          >
           <Select>
          {branchStaffs.map((branch) => (
             <Option key={branch._id} value={branch.firstName}>
          {branch.branchStaff}
           </Option>
          ))}
            </Select>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Branch"
        visible={isUpdateFormVisible}
        onCancel={() => setIsUpdateFormVisible(false)}
        footer={null}
      >
        <Form
          onFinish={(values) =>
            handleUpdateFormSubmit(updatePrevBranchData._id, values)
          }
          form={form}
          initialValues={updatePrevBranchData}
        >
          <Form.Item
            name="branchId"
            label="BranchId"
            rules={[
              {
                required: true,
                message: "Please enter the branch ID!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="branchName"
            label="Branch Name"
            rules={[
              {
                required: true,
                message: "Please enter the branch name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="branchLocation"
            label="Branch Location"
            rules={[
              {
                required: true,
                message: "Please enter the branch location!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="branchStaff"
            label="Branch Staff"
            rules={[
              {
                required: true,
                message: "Please select the branch staff!",
              },
            ]}
          >
            <Select>
          {branchStaffs.map((branch) => (
             <Option key={branch._id} value={branch._id}>
          {branch.branchStaff}
           </Option>
            ))}
            </Select>

          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" mx-2>
              Update
            </Button>
            <Button type="primary" onClick={() => { form.resetFields();  }} >
                      Cancel
                      </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default BranchList;
