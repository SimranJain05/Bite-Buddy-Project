const express = require('express')
const app = express();
const port = 5000

const connectToDB  = require("./db");
connectToDB();

// middleware 
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With , Content-Type , Accept"
    );
    next();
})
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use(express.json()) // middleware for parsing json request body

const CreateUserRoute = require("./Routes/CreateUser");  // import routes from other files

app.use("/api", CreateUserRoute);  // apply the  create users route to our application with the /api prefix


app.use("/api" , require("./Routes/loginUser"));

app.use("/api" , require("./Routes/DisplayData"));

app.use("/api" , require('./Routes/OrderData'));

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

