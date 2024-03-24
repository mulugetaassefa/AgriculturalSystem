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
import InvestorList from './pages/list/InvestorList';
import BranchList from './pages/list/BranchList';
import CreateOrder from './pages/orders/CreateOrder';
import CreateInput from './pages/inputs/CreateInput';
import UpdateInput from './pages/inputs/UpdateInput';
import DeleteInput from './pages/inputs/DeleteInput';
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
        
      </Routes>
    </Router>
  );
}

export default App;