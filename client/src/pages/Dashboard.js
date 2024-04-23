import React, { useEffect, useState } from 'react';
import { Card, Space, Statistic, Typography } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [branch, setBranch] = useState();
  const [investor, setInvestor] = useState();
  const [branchStaff, setBranchStaff] = useState();
  const [catagory, setCatagory] = useState(0);
  const [input, setInput] = useState(0);
  const [order, setOrder] = useState(0);
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/user/admin/dashboard')
      .then((res) => {
        if (res.data.ok) {
          setBranch(res.data.branchCount);
          setInvestor(res.data.investorCount);
          setBranchStaff(res.data.brachStaffCount);
          setCatagory(res.data.catagoryCount);
          setInput(res.data.inputCount);
          setOrder(res.data.orderCount);
        }
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  },[branch, investor, branchStaff]);

  return (
    <div>
      {user?.isAdmin || user?.isStockManager ? (
        <>
          <Typography.Title level={4}>Dashboard</Typography.Title>
          <Space direction="horizontal">
            <DashboardCard
              icon={
                <UserOutlined
                  style={{
                    color: 'red',
                    backgroundColor: 'rgba(255,0,0,0.25)',
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title="Branch"
              value={branch}
            />

            <DashboardCard
              icon={
                <ShoppingCartOutlined
                  style={{
                    color: 'red',
                    backgroundColor: 'rgba(255,0,0,0.25)',
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title="Investors"
              value={investor}
            />

            <DashboardCard
              icon={
                <ShoppingCartOutlined
                  style={{
                    color: 'red',
                    backgroundColor: 'rgba(255,0,0,0.25)',
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title="Category"
              value={catagory}
            />
             <DashboardCard
              icon={
                <ShoppingCartOutlined
                  style={{
                    color: 'red',
                    backgroundColor: 'rgba(255,0,0,0.25)',
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title="Inputs"
              value={input}
            />
             <DashboardCard
              icon={
                <ShoppingCartOutlined
                  style={{
                    color: 'red',
                    backgroundColor: 'rgba(255,0,0,0.25)',
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title="orders"
              value={order}
            />
          </Space>
        </>
      ) : null}
    </div>
  );
};

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default Dashboard;