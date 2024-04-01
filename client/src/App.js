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
import ListOfBranch from './pages/branch/ListOfBranch'
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
        <Route path='/register' element={ <publicRoute><Register /></publicRoute> } />
        <Route path='/'    element= { <ProtectedRoute><Home /></ProtectedRoute> } />
        <Route path='/apply-investor'    element= { <ProtectedRoute><ApplyInvestor /></ProtectedRoute> } />
        <Route path='/notification'    element= { <ProtectedRoute><Notification /></ProtectedRoute> } />
        <Route path='/profile'        element= { <ProtectedRoute><Profile /></ProtectedRoute> } />
        <Route path='/addBranch'     element= { <ProtectedRoute><AddBranch /></ProtectedRoute> } />
        <Route path='/deleteBranch'     element= { <ProtectedRoute><AddBranch /></ProtectedRoute> } />
        <Route path='/updateBranch'     element= { <ProtectedRoute><AddBranch /></ProtectedRoute> } />
        <Route path='/branchlist'     element= { <ProtectedRoute><ListOfBranch /></ProtectedRoute> } />
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

      </Routes>
    </Router>
  );
}

export default App;