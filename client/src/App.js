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
      </Routes>
    </Router>
  );
}

export default App;