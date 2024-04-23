import React, { useEffect, useState }from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Table,Button, Modal, Form, Input, Select } from 'antd'
const { Option } = Select;

const CreateInput = () => {
    const [inputs, setInputs] =useState([]);
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [upDateIntialValueData, setUpdateInputData] = useState(null);
   
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

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
    };

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

   

 // delete inputs
const deleteInput = async (_id) => {
  try {
    const response = await axios.delete(`/api/user/stockManager/input/${_id}`);
    console.log(response);
    if (response.status === 200 && response.data.success) {
      // Deletion was successful
      toast.success('input deleted successfully')
      console.log(response.data.message);
      getAllInputs();
    } else {
      // Handle error response
      console.log(response.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

  const handleCancelUpdate = () => {
    form.resetFields(); // Reset the form fields
    setUpdateInputData(null); // Reset the input data
    setIsUpdateFormVisible(false); // Hide the update modal
  };

  // handle update form submit
  const handleUpdateFormSubmit = async (inputId, values) => {
    try {
      const res = await axios.put(`/api/user/stockManager/input/${inputId}`, values);
      if (res.data.success) {
        toast.success('Input updated successfully');
        getAllInputs();
        setIsUpdateFormVisible(false); // Assuming you have a state variable to control the visibility of the modal
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error occurred while updating input data');
    }
  };

 // update input previous value
 const updateInputData = async (id) => {
  try {
    const res = await axios.get(`/api/user/stockManager/input/${id}`);
    if (res.data.success) {
      const inputData = res.data.data;
      setUpdateInputData(inputData); // Set the input data to be updated
      setIsUpdateFormVisible(true); // Show the update form
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error('Error occurred while retrieving input data');
  }
};
     //  create new inputs
      const handleFormSubmit = async (values) => {
        try { 
            console.log(values)
          const res = await axios.post('/api/user/stockManager/createInput', values);
          if (res.data.success) {
            toast.success('input created successfully');
            getAllInputs();
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
    
    // antD table col
    const columns = [
      {
        title: 'InputId',
        dataIndex: 'inputId',
      },
      {
        title: 'Input Name',
        dataIndex: 'name',
      },
      {
        title: 'Category',
        dataIndex: 'category',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
      },
      {
        title: 'Price',
        dataIndex: 'price',
      },

      {
        title: 'ExpiryDate',
        dataIndex: 'expiryDate',
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: (text, record) => (
          <div className="text-center m-2 mx-10">
            <button className="btn btn-danger mx-2"
             onClick={() => deleteInput(record._id)}>
              Delete
            </button> 
     <Button className="btn btn-danger"  onClick={() => {
     setIsUpdateFormVisible(true);
      updateInputData(record._id);
      }}> 
        Update
      </Button>
          </div>
        ),
      },
    ];


    useEffect(() => {
      getAllInputs();
      getAllCategories();
   }, []);
   
  return (
    <Layout>
      <h1 className='text-center m-2'>All Inputs</h1> 
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
          {categories.map((category) => (
             <Option key={category._id} value={category.name}>
          {category.inputs}
           </Option>
            ))}
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
      <Input type="date" />
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
          { isUpdateFormVisible  &&  updateInputData && ( 
          <Modal
          title="UpdateInput"
          visible={isUpdateFormVisible}
          onCancel={() => setIsUpdateFormVisible(false)}
          footer={null}
        >
            <Form
            form={form}
            initialValues={upDateIntialValueData}
            onFinish={(values) => handleUpdateFormSubmit(updateInputData.inputId, values)}
            >
              <Form.Item
                name="inputId"
                label="InputId"
                rules={[{ required: true, message: 'Please enter the input Id' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="name"
          label="Input Name"
          rules={[{ required: true, message: 'Please enter the input name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select the category' }]}
        > 
          <Select>
          {categories.map((category) => (
             <Option key={category._id} value={category._name}>
          {category.inputs}
           </Option>
            ))}
            </Select>

        </Form.Item>
        <Form.Item
          name="manufacturer"
          label="Manufacturer"
          rules={[{ required: true, message: 'Please enter the manufacturer org..' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Unit Price"
          rules={[{ required: true, message: 'Please enter the price of input' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please enter the quantity of input' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="expiryDate"
          label="Expiry Date"
          rules={[{ required: true, message: 'Please enter the expiry date' }]}
        >
        <Input />
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
      <div style={{ maxHeight: '400px', overflowY: 'scroll' }}> 
      <Table  columns={columns} dataSource={inputs}/>
      </div>
        
    </Layout>
  )
}

export default CreateInput;
