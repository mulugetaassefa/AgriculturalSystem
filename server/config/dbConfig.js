const mongoose =require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const connection =mongoose.connection;
// check connection seccessful
connection.on('connected', () => {
    console.log('MongoDB is connected');
})

// check connection error

connection.on("error", (error) => {
    console.log("Error in MongoDb connectin",error);
});
 
module.exports=mongoose;