const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
app.use(express.json());

const userRoute = require('./routes/userRoute');
const stockManagerRoute = require('./routes/stockManagerRoute');
const adminRoute =require('./routes/adminRoute');
const branchStaffRoute =require('./routes/branchStaff');
const farmerRoute =require('./routes/farmerRoute');
const farmUnionLeaderRoute =require('./routes/farmUnionLeader');
const investorRoute =require('./routes/InvestorRoute');


// All user-related routes from frontend  
app.use('/api/user', userRoute);
app.use('/api/user/stockManager', stockManagerRoute);  
app.use('/api/user/admin',adminRoute);
app.use('/api/user/farmer', farmerRoute);
app.use('/api/user/farmUnionLeader',farmUnionLeaderRoute);
app.use('/api/user/branchSttaf', branchStaffRoute);
app.use('/api/user/investor', investorRoute);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server is listening on port ${port}`));