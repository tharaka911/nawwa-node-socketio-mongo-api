import express from "express";
import dotenv from "dotenv";

//Load the environment variables from the .env file
dotenv.config();

//Create an express application
const app = express();

//Port number to run the server 
const PORT = process.env.PORT || 5000;

//Middleware to parse the incoming request body
app.use(express.json()); 

//health check route
app.get("/", (req, res) => {
	res.send("Hello World!!");
});

//Starts the server and listens on the specified port.
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
