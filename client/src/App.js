import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicdRoute from './components/PublicRoute';
import Notification from './pages/Notification';
import ApplyInvestor from './pages/ApplyInvestor';
import Profile from './pages/Profile';
import AddBranch from './pages/branch/AddBranch';

import InvestorList from './pages/user/InvestorList';
import BranchList from './pages/branch/BranchList';
import CreateOrder from './pages/orders/CreateOrder';
import CreateInput from './pages/inputs/CreateInput';
import UpdateInput from './pages/inputs/UpdateInput';
import DeleteInput from './pages/inputs/DeleteInput';
import Service from './pages/header/Service';
import Contact from './pages/header/Contact';
import About from './pages/header/About'
import Catagory from './pages/inputs/Catagory';
import FarmUnionLeader from './pages/farmUnion/farmLeader';
import ApplyToBranchMember from './pages/user/ApplyToBranchMember';
import TrackOrder from './pages/orders/TrackOrder';
import DistributeInput from './pages/inputs/DistributeInput';
import FarmerLogin from './pages/user/farmer/FarmerLogin';
import InvestorLogin from './pages/user/investor/InvestorLogin';

import InvestorHome from './pages/user/investor/InvestorHome';
import FarmerHome from './pages/user/farmer/FarmerHome';
import Order from './pages/user/farmer/Order';
import BranchStaffList from './pages/branchStaff/BranchStaffList';
import NotifyContent from './pages/NotifyContent';
import BranchStaffLogin from './pages/BranchStaffLogin';
import BranchStaffLoginPage from './pages/BranchStaffLogin';
import FarmerList from './pages/user/branchStaff/FarmerList';

function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <Router>
       { loading && (<div className='spinner-parent' >
       <div class="spinner-border" role="status">
     
    </div>
      </div> )  }
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
       <Route path='/login' element={ <PublicdRoute><Login /></PublicdRoute>} />
       <Route path='/branchSttafLogin' element={ <PublicdRoute><BranchStaffLoginPage /></PublicdRoute>} />
          
        <Route path='/register' element={ <publicRoute><Register /></publicRoute> } />
        <Route path='/'    element= { <ProtectedRoute><Home /></ProtectedRoute> } />
        <Route path='/apply-investor'    element= { <ProtectedRoute><ApplyInvestor /></ProtectedRoute> } />
        <Route path='/notification'    element= { <ProtectedRoute><Notification /></ProtectedRoute> } />
        <Route path='/admin/investor/notify'    element= { <ProtectedRoute>< NotifyContent /></ProtectedRoute> } />
        <Route path='/profile'        element= { <ProtectedRoute><Profile /></ProtectedRoute> } />

        <Route path='/addBranch'     element= { <ProtectedRoute><AddBranch /></ProtectedRoute> } />
        <Route path='/deleteBranch'     element= { <ProtectedRoute><AddBranch /></ProtectedRoute> } />
        <Route path='/updateBranch'     element= { <ProtectedRoute><AddBranch /></ProtectedRoute> } />
       
        <Route path='/investorsList'     element= { <ProtectedRoute><InvestorList /></ProtectedRoute> } />
        <Route path='/branches'     element= { <ProtectedRoute><BranchList /></ProtectedRoute> } />
        <Route path='/createOrder'     element= { <ProtectedRoute><CreateOrder /></ProtectedRoute> } />
        <Route path='/inputList'     element= { <ProtectedRoute><CreateInput /></ProtectedRoute> } />
        <Route path='/createInput'     element= { <ProtectedRoute><CreateInput /></ProtectedRoute> } />
        <Route path='/updateInput'     element= { <ProtectedRoute><UpdateInput /></ProtectedRoute> } />
        <Route path='/deleteInput'     element= { <ProtectedRoute><DeleteInput /></ProtectedRoute> } />
        <Route path='/orders'     element= { <ProtectedRoute><CreateOrder /></ProtectedRoute> } />
      
        { /* Header page */}   
          <Route path='/home'     element= { <ProtectedRoute><Home /></ProtectedRoute> } />
          <Route path='/service'     element= { <ProtectedRoute><Service /></ProtectedRoute> } />
          <Route path='/contact'     element= { <ProtectedRoute><Contact /></ProtectedRoute> } />
          <Route path='/about'     element= { <ProtectedRoute><About /></ProtectedRoute> } />  
          <Route path='/category'     element= { <ProtectedRoute><Catagory /></ProtectedRoute> } />
          <Route path='/farm-union'     element= { <ProtectedRoute><FarmUnionLeader/></ProtectedRoute> } />
          <Route path='/applyFarmer'     element= { <ProtectedRoute><ApplyToBranchMember   /></ProtectedRoute> } />
          { /* order */}  
          <Route path='/trackOrder'     element= { <ProtectedRoute><TrackOrder   /></ProtectedRoute> } />
          <Route path='/distribut-input'     element= { <ProtectedRoute><DistributeInput   /></ProtectedRoute> } /> 

          {/*  Farmer */}
        <Route path='/farmerLogin'     element= { <ProtectedRoute><FarmerLogin  /></ProtectedRoute> } /> 
        <Route path='/farmerHome'     element= { <ProtectedRoute><FarmerHome  /></ProtectedRoute> } /> 
        <Route path='/farmer/order'     element= { <ProtectedRoute><Order  /></ProtectedRoute> } /> 
        {/* investor */}

        <Route path='/investorLogin'     element= { <ProtectedRoute><InvestorLogin  /></ProtectedRoute> } /> 

        <Route path='/investor'     element= { <ProtectedRoute><InvestorHome  /></ProtectedRoute> } /> 
             {/* branchStaff */}

        
        <Route path='/branch/dashboard'     element= { <ProtectedRoute><BranchStaffList /></ProtectedRoute> } /> 
        <Route path='/branch/farmer'     element= { <ProtectedRoute><FarmerList /></ProtectedRoute> } /> 
        <Route path='/branch/order'     element= { <ProtectedRoute><BranchStaffList /></ProtectedRoute> } /> 
        <Route path='/branch/cart'     element= { <ProtectedRoute><BranchStaffList /></ProtectedRoute> } /> 
        <Route path='/branch/input'     element= { <ProtectedRoute><BranchStaffList /></ProtectedRoute> } /> 
        
      </Routes>
    </Router>
  );
}

export default App;