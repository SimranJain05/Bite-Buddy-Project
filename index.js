// const express = require('express')
// const app = express();
// require('dotenv').config()

// // const port = 5000
// const port =  process.env.PORT;
// const connectToDB  = require("./db");
// connectToDB();

// // deploy
// const path = require("path");

// // middleware 
// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin , X-Requested-With , Content-Type , Accept"
//     );
//     next();
// })
// // app.get('/', (req, res) => {
// //     res.send('Hello World')
// // })

// app.use(express.json()) // middleware for parsing json request body

// const CreateUserRoute = require("./Routes/CreateUser");  // import routes from other files

// app.use("/api", CreateUserRoute);  // apply the  create users route to our application with the /api prefix


// app.use("/api" , require("./Routes/loginUser"));

// app.use("/api" , require("./Routes/DisplayData"));

// app.use("/api" , require('./Routes/OrderData'));


// app.get("/",(req,res) => {
//     app.use(express.static(path.resolve(__dirname + "\frontend" , "build")));
//     res.sendFile(path.resolve( __dirname + "frontend" , "build" , "index.html"));
// });

// app.listen(port, ()=>{
//     console.log(`listening on port ${port}`)
// })

const express = require('express');
const app = express();
require('dotenv').config();

const connectToDB = require("./db");
connectToDB();

const path = require("path");

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Middleware for parsing JSON request body
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Routes
app.use("/api", require("./Routes/CreateUser")); // Create users route
app.use("/api", require("./Routes/loginUser")); // Login users route
app.use("/api", require("./Routes/DisplayData")); // Display data route
app.use("/api", require('./Routes/OrderData')); // Order data route

// Serve frontend build
app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

