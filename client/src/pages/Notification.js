import React from 'react';
import { Tabs } from 'antd';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';



const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/user/mark-all-notifications-as-seen',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/user/delete-all-notifications',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  const handleNotificationClick = (notification) => {
    navigate(notification.onClickPath);
    // Access the entire notification object and display its content
    console.log(notification);
  };

  return (
    <Layout>
      <h1 className='page-title'>Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab='Unseen' key={0}>
          <div className='d-flex justify-content-end'>
            <h1 className='anchor' onClick={() => markAllAsSeen()}>
              Mark all as Seen
            </h1>
          </div>
          {user?.unseenNotification.map((notification) => (
            <a
              href='/admin/investor/notify'
              className='card p-2 notification-link'
              onClick={() => handleNotificationClick(notification)}
              key={notification.id}
            >
              <div className='card-text'>{notification.message}</div>
            </a>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab='seen' key={1}>
          <div className='d-flex justify-content-end'>
            <h1 className='anchor' onClick={() => deleteAll()}>
              Delete all
            </h1>
          </div>
          {user?.seenNotification.map((notification) => (
            <a
              href='/admin/investor/notify'
              className='card p-2 notification-link'
              onClick={() => handleNotificationClick(notification)}
              key={notification.id}
            >
              <div className='card-text'>{notification.message}</div>
            </a>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;