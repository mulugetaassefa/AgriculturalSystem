import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useDispatch, useSelector} from 'react-redux';
import { user, reloadUser } from '../redux/userSlice';
import Dashboard from './Dashboard';
   

const Home = () => {
  const dispatch = useDispatch();
  const { user}  = useSelector((state) => state.user);
  const getData = async () => {
    try {
      const response = await axios.post(
        '/api/user/get-user-info-by-id',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <Layout>
  
      <Dashboard  user  />
    </Layout>
  );
};

export default Home;