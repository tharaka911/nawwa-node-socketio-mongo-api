// const tracer = require('dd-trace').init()
// import tracer from "dd-trace";  
// tracer.init({
//   service: "auth-service",
//   logInjection: true,
// });


import apminsight from 'apminsight';

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

//Load the environment variables from the .env file
dotenv.config();

//Create an express application
const app = express();

//Port number to run the server 
const PORT = process.env.PORT || 5000;

//Middleware to parse the incoming request body
app.use(express.json()); 
app.use(cookieParser());
//health check route
app.get("/", (req, res) => {
	res.send("Hello World!!");
});

//Routes for the application
app.use("/api/auth",authRoutes);
app.use("/api/messages",messagesRoutes);

//Starts the server and listens on the specified port.
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
