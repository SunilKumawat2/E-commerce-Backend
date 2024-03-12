const dbconnection = require("./config/DbConenection");
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const http = require("http")
const ApiRouter = require("./routes/ApiRouter");
const app = express();


// Middleware 
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"))
const port = process.env.PORT ; // Use PORT environment variable or default to 4000
const server = http.createServer(app); 

//  Routes
app.use("/ecommerce/api",ApiRouter);

server.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})