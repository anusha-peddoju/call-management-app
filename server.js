const express=require("express");
const connectDb=require("./config/dbconnection");
const errorHandler = require("./middleware/errorhandler");
const dotenv=require("dotenv").config();
connectDb();
const app=express();
 const port=process.env.PORT || 5000;
 app.use(express.json());
 app.use("/api/contacts",require("./routes/contact"));
 app.use("/api/users",require("./routes/user"));
 app.use(errorHandler);

 app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
 });
